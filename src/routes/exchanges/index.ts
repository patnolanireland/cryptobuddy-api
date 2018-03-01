import { Request, Response, Server } from 'restify';
import { bootstrap as bootstrapKraken } from './kraken';

const data = [{
    name: 'Kraken',
}];

const getExchanges = (req: Request, res: Response) => {
    res.send(200, data);
};

export const bootstrap = (server: Server): void => {
    server.get('exchanges', getExchanges);
    bootstrapKraken(server);
};
