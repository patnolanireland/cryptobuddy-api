import { IDictionaryItem } from '../dictionary-item';

/* OHLC - https://en.wikipedia.org/wiki/Open-high-low-close_chart */

/* This tuple is used as the basis of an OHLC type.  Kraken returns an array of these tuples
 *
 * [<time>, <open>, <high>, <low>, <close>, <vwap>, <volume>, <count>]
 *
 * */
export type OHLC = [
        /* <time> */
        number,
        /* <open> */
        string,
        /* <high> */
        string,
        /* <low> */
        string,
        /* <close> */
        string,
        /* <vwap> */
        string,
        /* <volume> */
        string,
        /* <count> */
        number
];

/* The intersection type here allows the dicionary key to be a number to facilate the property
 * "last" which is used for polling
 *
 * */
export type OHLCDictionary = IDictionaryItem<OHLC[] | number>;
