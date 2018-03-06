import { Request, Response } from 'restify';
import { OHLCDictionaryResponse } from '../../../model/kraken/response';
import { getOHLCAsync } from '../../../services/kraken-api-client';

import { logger as log } from '../../../logger';

export const getOHLC = async (req: Request, res: Response) => {
    log.debug('getOHLC -> req.query', req.query);
    try {
        const { pair } = req.params;
        const { interval, since } = req.query;

        const ohlc: OHLCDictionaryResponse = await getOHLCAsync(pair, interval, since);

        res.send(200, ohlc);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
