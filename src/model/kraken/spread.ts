import { IDictionaryItem } from '../dictionary-item';

/*
 * array of array entries(<time>, <bid>, <ask>) *
 **/
export type Spread = [
    /* <time> */
    number,
    /* <bid> */
    string,
    /* <ask> */
    string
];

export type SpreadDictionary = IDictionaryItem<Spread[] | number>;
