import { Request, Response } from 'restify';
import { TickerDataDictionaryResponse } from '../../../model/kraken/response';
import { getTickerDataAsync } from '../../../services/kraken-api-client';

export const getTickerData = async (req: Request, res: Response) => {
    try {
        const tickerData: TickerDataDictionaryResponse = await getTickerDataAsync(req.params.pair);

        res.send(200, tickerData);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
