import { Request, Response } from 'restify';
import { OrderBookDictionaryResponse } from '../../../model/kraken/response';
import { getOrderBookAsync } from '../../../services/kraken-api-client';

import { logger as log } from '../../../logger';

export const getOrderBook = async (req: Request, res: Response) => {
    log.debug('getOrderBook -> req.query', req.query);
    try {
        const { pair } = req.params;
        const { count } = req.query;

        const orderBook: OrderBookDictionaryResponse = await getOrderBookAsync(pair, count);

        res.send(200, orderBook);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
