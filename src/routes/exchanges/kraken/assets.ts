import { Request, Response } from 'restify';
import { AssetDictionaryResponse } from '../../../model/kraken/response';
import { getTradableAssetsAsync } from '../../../services/kraken-api-client';

export const getAssets = async (req: Request, res: Response) => {
    try {
        const assets: AssetDictionaryResponse = await getTradableAssetsAsync();

        res.send(200, assets);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
