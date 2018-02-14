/* This intersection type acts as a tuple with an additonal named property last.
 *
 * array of array entries(<time>, <bid>, <ask>) *
 **/
export type Spread = [
    number,
    string,
    string
] & {
    /* id to be used as since when polling for new spread data */
    last: number;
};
