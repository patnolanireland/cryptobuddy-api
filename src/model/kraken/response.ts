import { AssetDictionary } from './asset';
import { AssetPairDictionary } from './asset-pair';
import { IServerTime } from './server-time';
import { TickerDataDictionary } from './ticker-data';

export interface IResponse<T> {
    error: string[];
    result: T;
}

export type ServerTimeResponse = IResponse<IServerTime>;
export type AssetDictionaryResponse = IResponse<AssetDictionary>;
export type AssetPairDictionaryResponse = IResponse<AssetPairDictionary>;
export type TickerDataDictionaryResponse = IResponse<TickerDataDictionary>;
