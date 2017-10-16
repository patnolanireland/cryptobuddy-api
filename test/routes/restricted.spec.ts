import * as assert from 'assert';
import * as chai from 'chai';
import * as config from 'config';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';

import { server as api } from '../../src/server';

const expect = chai.expect;

describe('Restricted Content', () => {
    describe('GET /restricted without a valid JWT', () => {
        it('should respond with a HTTP 401 Unauthorized', (done) => {
            request(api)
            .get('/restricted')
            .expect(401, done)
        });
    });

    describe('GET /restricted with a valid JWT Bearer Token', () => {
        const token = jwt.sign({
            firstName: 'Tommy',
            iat: Date.now() / 1000,
            lastName: 'Tester',
        }, config.get('Server.authSecret'), {
            expiresIn: 5000,
            subject: 'mocha unit tests'
        });

        it('should respond with a HTTP 200 OK', (done) => {
            request(api)
            .get('/restricted')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200, {
                msg: 'This resource requires authorization, congratulations!'
            }, done)
        });
    });

    describe('GET /restricted with an expired JWT Bearer Token', () => {
        /* Backdate a token 31 days */
        const token = jwt.sign({
            firstName: 'Tommy',
            iat: Math.floor(Date.now() / 1000) - (60 * 60 * 24 * 31),
            lastName: 'Tester',
        }, config.get('Server.authSecret'), {
            expiresIn: '30 days',
            subject: 'mocha unit tests'
        });

        it('should respond with a HTTP 401 Unauthorized', (done) => {
            request(api)
            .get('/restricted')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(401, done)
        });
    });

    describe('GET /restricted with an invalid JWT Bearer Token', () => {
        /* A token with an invalid signature */
        const token = jwt.sign({
            firstName: 'Tommy',
            iat: Math.floor(Date.now() / 1000),
            lastName: 'Tester',
        }, 'notthepropersigningkey', {
            expiresIn: '30 days',
            subject: 'mocha unit tests'
        });

        it('should respond with a HTTP 401 Unauthorized', (done) => {
            request(api)
            .get('/restricted')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(401, done)
        });
    });

    describe('GET /restricted with a tampered JWT Bearer Token', () => {
        /* A token with an invalid signature */
        const token = jwt.sign({
            firstName: 'Tommy',
            iat: Math.floor(Date.now() / 1000),
            lastName: 'Tester',
            roles: ['user'],
        }, config.get('Server.authSecret'), {
            expiresIn: '30 days',
            subject: 'mocha unit tests'
        });

        const token_parts = token.split('.');
        const payload = JSON.parse(Buffer.from(token_parts[1], 'base64').toString());
        /* Attempt to overwrite the roles associated with the token which should invalidate the signature */
        const tamperedPayload = Buffer.from(JSON.stringify({ ...payload,  roles: [ 'admin' ] })).toString('base64');

        it('should respond with a HTTP 401 Unauthorized', (done) => {
            request(api)
            .get('/restricted')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${[token_parts[0], tamperedPayload, token_parts[2]].join('.')}`)
            .expect('Content-Type', 'application/json')
            .expect((res: request.Response) => assert(res.body.message === 'caused by JsonWebTokenError: invalid token'))
            .expect(401, done)
        });
    });

    /* If we don't shutdown the server mocha will hang as the restify server is still running */
    after(() => api.close())
});

