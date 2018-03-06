import { IDictionaryItem } from '../dictionary-item';

export interface IOrderBook {
    /* ask side array of array entries(<price>, <volume>, <timestamp>) */
    asks: Array<[string, string, number]>;
    /* bid side array of array entries(<price>, <volume>, <timestamp>) */
    bids: Array<[string, string, number]>;
}

export type OrderBookDictionary = IDictionaryItem<IOrderBook>;
