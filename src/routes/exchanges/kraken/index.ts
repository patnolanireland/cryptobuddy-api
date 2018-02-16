import { Server } from 'restify';
import { getServerTime } from './time';
import { getAssets } from './assets';
import { getAssetPairs } from './asset-pairs';
import { getTickerData } from './ticker-data';

export const bootstrap = (server: Server): void => {
    server.get('exchanges/kraken/time', getServerTime);
    server.get('exchanges/kraken/assets', getAssets);
    server.get('exchanges/kraken/asset-pairs', getAssetPairs);
    server.get('exchanges/kraken/ticker-data/:pair', getTickerData);
};