export interface AssetPair {
    /* asset class of base component */
    aclass_base: string;
    /* asset id of base component */
    base: string;
    /* asset class of quote component */
    aclass_quote: string;
    /* asset id of quote component */
    quote: string;
    /* volume lot size */
    lot: string;
    /* scaling decimal places for pair */
    pair_decimals: number;
    /* scaling decimal places for volume */
    lot_decimals: number;
    /* amount to multiply lot volume by to get currency volume */
    lot_multiplier: number;
    /* array of leverage amounts available when buying */
    leverage_buy: number[];
    /* array of leverage amounts available when selling */
    leverage_sell: number[];
    /* fee schedule array in [volume, percent fee] tuples */
    fees: [number,number][];
    /* maker fee schedule array in [volume, percent fee] tuples (if on maker/taker) */
    fees_maker: [number, number][];
    /* volume discount currency */
    fee_volume_currency: string;
    /* margin call level */
    margin_call: number;
    /* stop-out/liquidation margin level */
    margin_stop: number;
}
