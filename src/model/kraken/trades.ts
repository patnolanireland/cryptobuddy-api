/* This intersection type acts as a tuple with an additonal named property last.
 *
 * array of array entries(<price>, <volume>, <time>, <buy/sell>, <market/limit>, <miscellaneous>)
 **/
export type Trades = [
    string,
    string,
    number,
    string,
    string,
    string
] & {
    /* id to be used as since when polling for new trade data */
    last: number;
}
