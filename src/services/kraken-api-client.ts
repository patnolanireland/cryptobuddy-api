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
    IResponse,
    IServerTime,
    ITickerData,
} from '../model/kraken';
import {
    AssetDictionaryResponse,
    AssetPairDictionaryResponse,
    ServerTimeResponse,
    TickerDataDictionaryResponse,
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

/* Stub for now will be extended when implemeting the private api calls */
export class KrakenPrivateApiClient {

    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

}
