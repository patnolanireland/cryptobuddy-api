import { IDictionaryItem } from '../dictionary-item';

/*
 * array of array entries(<price>, <volume>, <time>, <buy/sell>, <market/limit>, <miscellaneous>)
*/
export type Trades = [
    /* <price> */
    string,
    /* <volume> */
    string,
    /* <time> */
    number,
    /* <buy/sell> */
    string,
    /* <market/limit> */
    string,
    /* <miscellaneous> */
    string
];

/* The intersection type here allows the dicionary key to be a number to facilate the property
 * "last" which is used for polling
 *
 * */
export type TradesDictionary = IDictionaryItem<Trades[] | number>;
