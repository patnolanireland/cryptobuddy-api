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
    OHLCDictionaryResponse,
    OrderBookDictionaryResponse,
    ServerTimeResponse,
    SpreadDictionaryResponse,
    TickerDataDictionaryResponse,
    TradesDictionaryResponse,
} from '../../../src/model/kraken/response';

import * as STUB_TIME_RESPONSE_JSON from './responses/kraken/time.json';
import * as STUB_ASSETS_RESPONSE_JSON from './responses/kraken/assets.json';
import * as STUB_ASSET_PAIRS_RESPONSE_JSON from './responses/kraken/asset-pairs.json';
import * as STUB_TICKER_DATA_XBT_USD from './responses/kraken/ticker-xbt-usd.json';
import * as STUB_OHLC_RESPONSE_JSON from './responses/kraken/ohlc.json';
import * as STUB_DEPTH_RESPONSE_JSON from './responses/kraken/depth-xbt-usd.json';
import * as STUB_TRADES_RESPONSE_JSON from './responses/kraken/trades-xbt-usd.json';
import * as STUB_SPREAD_RESPONSE_JSON from './responses/kraken/spread-xbt-usd.json';

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
            const responseBody: ServerTimeResponse = STUB_TIME_RESPONSE_JSON;

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
            const response: AssetDictionaryResponse = STUB_ASSETS_RESPONSE_JSON;

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
            const response: AssetPairDictionaryResponse = STUB_ASSET_PAIRS_RESPONSE_JSON;

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
            const response: TickerDataDictionaryResponse = STUB_ASSET_PAIRS_RESPONSE_JSON;

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

    describe('GET /exchanges/kraken/ohlc/{pair}', () => {
        it('should respond with an OHLCDictionaryResponse for the supplied asset pair', (done) => {
            const response: OHLCDictionaryResponse = STUB_OHLC_RESPONSE_JSON;

            nock(krakenBasePublicUrl)
                .get('/OHLC')
                .query({
                    interval: 1,
                    pair: 'XBTUSD',
                })
                .reply(200, response);

            request(api)
                .get('/exchanges/kraken/ohlc/XBTUSD')
                .set('Accept', 'application/json')
                .expect(200, response, done);
        });
    });

    describe('GET /exchanges/kraken/order-book/{pair}', () => {
        it('should respond with an OHLCDictionaryResponse for the supplied asset pair', (done) => {
            const response: OrderBookDictionaryResponse = STUB_DEPTH_RESPONSE_JSON;

            nock(krakenBasePublicUrl)
                .get('/Depth')
                .query({
                    pair: 'XBTUSD',
                })
                .reply(200, response);

            request(api)
                .get('/exchanges/kraken/order-book/XBTUSD')
                .set('Accept', 'application/json')
                .expect(200, response, done);
        });
    });

    describe('GET /exchanges/kraken/trades/{pair}', () => {
        it('should respond with an TradesDictionaryResponse for the supplied asset pair', (done) => {

            const response: TradesDictionaryResponse = STUB_TRADES_RESPONSE_JSON;
            nock(krakenBasePublicUrl)
                .get('/Trades')
                .query({
                    pair: 'XBTUSD',
                })
                .reply(200, response);

            request(api)
                .get('/exchanges/kraken/trades/XBTUSD')
                .set('Accept', 'application/json')
                .expect(200, response, done);
        });
    });

    describe('GET /exchanges/kraken/spread/{pair}', () => {
        it('should respond with an SpreadDictionaryResponse for the supplied asset pair', (done) => {
            const response: SpreadDictionaryResponse = STUB_SPREAD_RESPONSE_JSON;

            nock(krakenBasePublicUrl)
                .get('/Spread')
                .query({
                    pair: 'XBTUSD',
                })
                .reply(200, response);

            request(api)
                .get('/exchanges/kraken/spread/XBTUSD')
                .set('Accept', 'application/json')
                .expect(200, response, done);
        });
    });

    /* If we don't shutdown the server mocha will hang as the restify server is still running */
    after(() => api.close());
});
