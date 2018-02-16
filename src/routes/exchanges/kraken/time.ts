import { Request, Response } from 'restify';
import { ServerTimeResponse } from '../../../model/kraken/response';
import { getServerTimeAsync } from '../../../services/kraken-api-client';

export const getServerTime = async (req: Request, res: Response) => {
    try {
        const time: ServerTimeResponse = await getServerTimeAsync();

        res.send(200, time);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
