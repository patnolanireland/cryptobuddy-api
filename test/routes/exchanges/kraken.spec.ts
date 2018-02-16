import * as assert from 'assert';
import * as chai from 'chai';
import * as config from 'config';
import * as nock from 'nock';
import * as request from 'supertest';
import * as url from 'url';

import { server as api } from '../../../src/server';
import {
    AssetDictionaryResponse,
    AssetPairDictionaryResponse,
    ServerTimeResponse,
    TickerDataDictionaryResponse,
} from '../../../src/model/kraken/response';

const expect = chai.expect;
const krakenCfg: any = config.get('Services.Exchanges.Kraken');

/* The tests currently mock the kraken responses here, in the future the nock requests should be moved into the services
 * where they are actaully called.  As the services are effectively a proxy the test coverage is good enough for the
 * moment
 */
describe('Kraken Public API Routes', () => {
    const krakenBasePublicUrl = url.format({
        hostname: krakenCfg.hostname,
        pathname: '/0/public',
        protocol: krakenCfg.protocol,
    });

    describe('GET /exchanges/kraken/time', () => {
        it('should respond with an ServerTimeResponse', (done) => {
            const responseBody: ServerTimeResponse = {
                error: [],
                result: {
                    rfc1123: 'Thu Feb 15 2018 21:53:18 GMT-0500 (-05)',
                    unixtime: 1518749604951,
                },
            };

            nock(krakenBasePublicUrl)
                .get('/Time')
                .reply(200, responseBody);

            request(api)
                .get('/exchanges/kraken/time')
                .set('Accept', 'application/json')
                .expect(200, responseBody, done);

        });
    });

    describe('GET /exchanges/kraken/assets', () => {
        it('should respond with an AssetDictionaryResponse', (done) => {
            const response: AssetDictionaryResponse = {
                error: [],
                result: {
                    BCH: {
                        aclass: 'currency',
                        altname: 'BCH',
                        decimals: 10,
                        display_decimals: 5,
                    },
                    DASH: {
                        aclass: 'currency',
                        altname: 'DASH',
                        decimals: 10,
                        display_decimals: 5,
                    },
                },
            };

            nock(krakenBasePublicUrl)
                .get('/Assets')
                .reply(200, response);

            request(api)
                .get('/exchanges/kraken/assets')
                .set('Accept', 'application/json')
                .expect(200, response, done);
        });
    });

    describe('GET /exchanges/kraken/asset-pairs', () => {
        it('should respond with an AssetPairDictionaryResponse', (done) => {
            const response: AssetPairDictionaryResponse = {
                error: [],
                result: {
                    BCHEUR: {
                        aclass_base: 'currency',
                        aclass_quote: 'currency',
                        altname: 'BCHEUR',
                        base: 'BCH',
                        fee_volume_currency: 'ZUSD',
                        fees: [
                            [
                                0,
                                0.26,
                            ],
                            [
                                50000,
                                0.24,
                            ],
                            [
                                100000,
                                0.22,
                            ],
                            [
                                250000,
                                0.2,
                            ],
                            [
                                500000,
                                0.18,
                            ],
                            [
                                1000000,
                                0.16,
                            ],
                            [
                                2500000,
                                0.14,
                            ],
                            [
                                5000000,
                                0.12,
                            ],
                            [
                                10000000,
                                0.1,
                            ],
                        ],
                        fees_maker: [
                            [
                                0,
                                0.16,
                            ],
                            [
                                50000,
                                0.14,
                            ],
                            [
                                100000,
                                0.12,
                            ],
                            [
                                250000,
                                0.1,
                            ],
                            [
                                500000,
                                0.08,
                            ],
                            [
                                1000000,
                                0.06,
                            ],
                            [
                                2500000,
                                0.04,
                            ],
                            [
                                5000000,
                                0.02,
                            ],
                            [
                                10000000,
                                0,
                            ],
                        ],
                        leverage_buy: [],
                        leverage_sell: [],
                        lot: 'unit',
                        lot_decimals: 8,
                        lot_multiplier: 1,
                        margin_call: 80,
                        margin_stop: 40,
                        pair_decimals: 1,
                        quote: 'ZEUR',
                    },
                },
            };

            nock(krakenBasePublicUrl)
                .get('/AssetPairs')
                .reply(200, response);

            request(api)
                .get('/exchanges/kraken/asset-pairs')
                .set('Accept', 'application/json')
                .expect(200, response, done);

        });
    });

    describe('GET /exchanges/kraken/ticker-data/{asset-pair-csv}', () => {
        it('should respond with a TickerDataDictionaryResponse for the supplied asset pairs csv', (done) => {
            const response: TickerDataDictionaryResponse = {
                error: [],
                result: {
                    BCHUSD: {
                        a: [
                            '1488.100000',
                            '1',
                            '1.000',
                        ],
                        b: [
                            '1484.800000',
                            '5',
                            '5.000',
                        ],
                        c: [
                            '1486.800000',
                            '0.00219329',
                        ],
                        h: [
                            '1553.900000',
                            '1553.900000',
                        ],
                        l: [
                            '1353.700000',
                            '1338.000000',
                        ],
                        o: '1357.200000',

                        p: [
                            '1473.284634',
                            '1457.407438',
                        ],
                        t: [
                            5450,
                            6813,
                        ],
                        v: [
                            '3212.40579215',
                            '3851.82657163',
                        ],
                    },
                },
            };

            nock.cleanAll();
            nock(krakenBasePublicUrl)
                .get('/Ticker')
                .query({
                    pair: 'BTCUSD',
                })
                .reply(200, response);

            request(api)
                .get('/exchanges/kraken/ticker-data/BTCUSD')
                .set('Accept', 'application/json')
                .expect(200, response, done);

        });
    });

    /* If we don't shutdown the server mocha will hang as the restify server is still running */
    after(() => api.close());
});
