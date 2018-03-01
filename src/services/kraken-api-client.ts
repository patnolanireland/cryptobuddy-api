import * as config from 'config';
import { Request, Response } from 'restify';
import * as url from 'url';
import * as request from 'request-promise-native';
import { OptionsWithUrl } from 'request';

import { logger as log } from '../logger';
import { IDictionaryItem } from '../model/dictionary-item';
/* The interface imports are necessary for use in the subsequent types */
import {
    IAsset,
    IAssetPair,
    IOrderBook,
    IResponse,
    IServerTime,
    ITickerData,
    OHLC,
} from '../model/kraken';
import {
    AssetDictionaryResponse,
    AssetPairDictionaryResponse,
    OHLCDictionaryResponse,
    OrderBookDictionaryResponse,
    ServerTimeResponse,
    TickerDataDictionaryResponse,
    TradesDictionaryResponse,
} from '../model/kraken/response';

/* Public API calls are just simple functions as no state is maintained */

const krakenCfg: any = config.get('Services.Exchanges.Kraken');

const krakenBasePublicUrl = url.format({
    hostname: krakenCfg.hostname,
    pathname: '/0/public',
    protocol: krakenCfg.protocol,
});

export const getServerTimeAsync = async (): Promise<ServerTimeResponse> => {
    try {
        const serverTime = await request({
            json: true,
            url: `${krakenBasePublicUrl}/Time`,
        });

        return serverTime;
    } catch (e) {
        log.error('Failed to get server time from kraken', e);
    }
};

export const getTradableAssetsAsync = async (): Promise<AssetDictionaryResponse> => {
    try {
        const assets = await request({
            json: true,
            url: `${krakenBasePublicUrl}/Assets`,
        });

        return assets;
    } catch (e) {
        log.error('Failed to get assets from Kraken ', e);
        throw e;
    }
};

export const getTradableAssetPairsAsync = async (): Promise<AssetPairDictionaryResponse> => {
    try {
        const assetPairs = await request.get({
            json: true,
            url: `${krakenBasePublicUrl}/AssetPairs`,
        });

        return assetPairs;
    } catch (e) {
        log.error('Failed to get assets from Kraken ', e);
        throw e;
    }
};

export const getTickerDataAsync = async (assetPairsCsv: string): Promise<TickerDataDictionaryResponse> => {
    try {
        const tickerData = await request.get({
            json: true,
            url: `${krakenBasePublicUrl}/Ticker?pair=${assetPairsCsv}`,
        });

        return tickerData;
    } catch (e) {
        log.error('Failed to get assets from Kraken ', e);
        throw e;
    }
};

export const getOHLCAsync =
    async (assetPair: string, interval: number = 1, since: number): Promise<OHLCDictionaryResponse> => {
        try {
            const krakenUrl = since ?
                `${krakenBasePublicUrl}/OHLC?pair=${assetPair}&interval=${interval}&since=${since}` :
                `${krakenBasePublicUrl}/OHLC?pair=${assetPair}&interval=${interval}`;

            const ohlc = await request.get({
                json: true,
                url: krakenUrl,
            });

            return ohlc;
        } catch (e) {
            log.error('Failed to get open high low close data from Kraken ', e);
            throw e;
        }
    };

export const getOrderBookAsync = async (assetPair: string, count: number): Promise<OrderBookDictionaryResponse> => {
    try {
        const krakenUrl = count ?
            `${krakenBasePublicUrl}/Depth?pair=${assetPair}&count=${count}` :
            `${krakenBasePublicUrl}/Depth?pair=${assetPair}`;

        const orderBook = await request.get({
            json: true,
            url: krakenUrl,
        });

        return orderBook;
    } catch (e) {
        log.error('Failed to get order book from Kraken ', e);
        throw e;
    }
};

export const getTradesAsync = async (assetPair: string, since: number): Promise<TradesDictionaryResponse> => {
    try {
        const krakenUrl = since ?
            `${krakenBasePublicUrl}/Trades?pair=${assetPair}&since=${since}` :
            `${krakenBasePublicUrl}/Trades?pair=${assetPair}`;

        const trades = await request.get({
            json: true,
            url: krakenUrl,
        });

        return trades;
    } catch (e) {
        log.error('Failed to get trades data from Kraken ', e);
        throw e;
    }
};
/* Stub for now will be extended when implemeting the private api calls */
export class KrakenPrivateApiClient {

    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

}
