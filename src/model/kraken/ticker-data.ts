import { IDictionaryItem } from '../dictionary-item';

export interface ITickerData {
    /* ask array(<price>, <whole lot volume>, <lot volume>) */
    a: [string, string, string];
    /* bid array(<price>, <whole lot volume>, <lot volume>) */
    b: [string, string, string];
    /* last trade closed array(<price>, <lot volume>) */
    c: [string, string];
    /* volume array(<today>, <last 24 hours>) */
    v: [string, string];
    /* volume weighted average price array(<today>, <last 24 hours>) */
    p: [string, string];
    /* number of trades array(<today>, <last 24 hours>) */
    t: [number, number];
    /* low array(<today>, <last 24 hours>) */
    l: [string, string];
    /* high array(<today>, <last 24 hours>) */
    h: [string, string];
    /* today's opening price */
    o: string;
}

export type TickerDataDictionary = IDictionaryItem<ITickerData>;
