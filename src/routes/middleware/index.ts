import * as bunyan from 'bunyan';
import * as config from 'config';
import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';

import { logger as log } from '../../logger';

export const bootstrap = (server: restify.Server) => {

    const cors = corsMiddleware({
        allowHeaders: config.get('Server.corsHeaders'),
        exposeHeaders: [],
        origins: config.get('Server.corsOrigins'),
    });

    server.pre(cors.preflight);
    server.use(cors.actual);

    // http://restify.com/docs/plugins-api/
    server.use(restify.plugins.queryParser({ mapParams: true }));
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.authorizationParser());
    server.use(restify.plugins.dateParser());
    server.use(restify.plugins.fullResponse());
    server.use(restify.plugins.bodyParser({ mapParams: true }));

    const auditLoggerCfg: restify.plugins.AuditLoggerOptions = {
        event: 'after',
        log,
        server,
    };

    server.on('after', restify.plugins.auditLogger(auditLoggerCfg));
};
