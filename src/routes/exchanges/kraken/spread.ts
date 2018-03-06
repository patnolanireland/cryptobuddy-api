import { Request, Response } from 'restify';
import { SpreadDictionaryResponse } from '../../../model/kraken/response';
import { getSpreadAsync } from '../../../services/kraken-api-client';

export const getSpread = async (req: Request, res: Response) => {
    try {
        const { pair } = req.params;
        const { since } = req.query;

        const spread: SpreadDictionaryResponse = await getSpreadAsync(pair, since);

        res.send(200, spread);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
