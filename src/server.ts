import * as config from 'config';
import * as restify from 'restify';
import { logger as log } from './logger';
import { bootstrap } from './routes';

export const server = restify.createServer();

bootstrap(server);

const serverName = config.get('Server.name');
const port = config.get('Server.port');
const mode = process.env.NODE_ENV || 'dev';

log.info(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);

server.listen(port, () => log.info(`${serverName} started and listening on port ${port} in ${mode} mode`));
