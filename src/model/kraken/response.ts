import { AssetDictionary } from './asset';
import { AssetPairDictionary } from './asset-pair';
import { IServerTime } from './server-time';
import { TickerDataDictionary } from './ticker-data';
import { OHLCDictionary } from './ohlc';
import { OrderBookDictionary } from './order-book';
import { TradesDictionary } from './trades';
import { SpreadDictionary } from './spread';

export interface IResponse<T> {
    error: string[];
    result: T;
}

export interface IPollableResponse<T> extends IResponse<T> {
    result: T & { last: number };
}

export type ServerTimeResponse = IResponse<IServerTime>;
export type AssetDictionaryResponse = IResponse<AssetDictionary>;
export type AssetPairDictionaryResponse = IResponse<AssetPairDictionary>;
export type TickerDataDictionaryResponse = IResponse<TickerDataDictionary>;
export type OHLCDictionaryResponse = IPollableResponse<OHLCDictionary>;
export type OrderBookDictionaryResponse = IResponse<OrderBookDictionary>;
export type TradesDictionaryResponse = IResponse<TradesDictionary>;
export type SpreadDictionaryResponse = IResponse<SpreadDictionary>;
