import { Request, Response } from 'restify';
import { TradesDictionaryResponse } from '../../../model/kraken/response';
import { getTradesAsync } from '../../../services/kraken-api-client';

export const getTrades = async (req: Request, res: Response) => {
    try {
        const { pair } = req.params;
        const { since } = req.query;

        const trades: TradesDictionaryResponse = await getTradesAsync(pair, since);

        res.send(200, trades);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
