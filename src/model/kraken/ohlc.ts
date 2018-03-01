import { IDictionaryItem } from '../dictionary-item';

/* OHLC - https://en.wikipedia.org/wiki/Open-high-low-close_chart */

/* This intersection type acts as an extended tuple to include a named property last.
 *
 * array of array entries(<time>, <open>, <high>, <low>, <close>, <vwap>, <volume>, <count>) */
export type OHLC = [
    [
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
    ]
] & {
        /* id to be used as since when polling for new, committed OHLC data */
        last: number;
    };

export type OHLCDictionary = IDictionaryItem<OHLC>;
