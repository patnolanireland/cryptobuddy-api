import * as assert from 'assert';
import * as chai from 'chai';
import * as config from 'config';
import * as nock from 'nock';
import * as request from 'supertest';
import * as url from 'url';

import { server as api } from '../../../src/server';
import { IExchange } from '../../../src/model';
import * as STUB_EXCHANGES_RESPONSE from './responses/exchanges.json';

const expect = chai.expect;

describe('Exchanges API Routes', () => {

    describe('GET /exchanges', () => {
        it('should respond with an array of IExchange', (done) => {
            const responseBody: IExchange[] = STUB_EXCHANGES_RESPONSE;

            request(api)
                .get('/exchanges')
                .set('Accept', 'application/json')
                .expect(200, responseBody, done);

        });
    });
});
