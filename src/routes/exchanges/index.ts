import { Request, Response, Server } from 'restify';
import { bootstrap as bootstrapKraken } from './kraken';

const data = [{
    // tslint:disable:max-line-length
    desc: 'Founded in 2011, San Francisco-based Kraken is the largest Bitcoin exchange in euro volume and liquidity and also trading Canadian dollars, US dollars, British pounds and Japanese yen. Kraken is consistently rated the best and most secure Bitcoin exchange by independent news media. Kraken was the first Bitcoin exchange to have trading price and volume displayed on the Bloomberg Terminal, the first to pass a cryptographically verifiable proof-of-reserves audit, and is a partner in the first cryptocurrency bank. Kraken is trusted by hundreds of thousands of traders, the Tokyo government\'s court-appointed trustee, and Germany\'s BaFin regulated Fidor Bank.',
    logoUrl: 'https://www.kraken.com/img/facade/kraken_logo.png',
    logoUrlUnofficial: 'https://cryptocoincharts.info/img/exchanges/kraken.svg',
    name: 'Kraken',
    }];

const getExchanges = (req: Request, res: Response) => {
    res.send(200, data);
};

export const bootstrap = (server: Server): void => {
    server.get('exchanges', getExchanges);
    bootstrapKraken(server);
};
