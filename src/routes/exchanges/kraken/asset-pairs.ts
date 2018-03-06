import { Request, Response } from 'restify';
import { AssetPairDictionaryResponse } from '../../../model/kraken/response';
import { getTradableAssetPairsAsync } from '../../../services/kraken-api-client';

export const getAssetPairs = async (req: Request, res: Response) => {
    try {
        const assetPairs: AssetPairDictionaryResponse = await getTradableAssetPairsAsync();

        res.send(200, assetPairs);
    } catch (e) {
        res.send(500, {
            msg: 'Failed to communicate with Kraken',
        });
    }
};
