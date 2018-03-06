import * as dotenv from 'dotenv';
dotenv.config();
import * as config from 'config';
import * as restify from 'restify';
import { logger as log } from './logger';
import { bootstrap } from './routes';

export const server = restify.createServer();

bootstrap(server);

const serverName = config.get('Server.name');
const port = process.env.PORT || config.get('Server.port');
const mode = process.env.NODE_ENV || 'development';

log.info('Server.corsOrigins', config.get('Server.corsOrigins'));

server.listen(port, () => log.info(`${serverName} started and listening on port ${port} in ${mode} mode`));
