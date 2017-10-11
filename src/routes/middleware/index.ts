import * as bunyan from 'bunyan';
import * as config from 'config';
import * as restify from 'restify';

import { logger as log } from '../../logger';

export const bootstrap = (server: restify.Server) => {

    // http://restify.com/docs/plugins-api/
    server.use(restify.plugins.queryParser({ mapParams: true }));
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.authorizationParser());
    server.use(restify.plugins.dateParser());
    server.use(restify.plugins.fullResponse());
    server.use(restify.plugins.bodyParser({ mapParams: true }));

    /* Please note this is not setup for CORS at this point
     * Restify middleware is broken due to peerDependency issues
    */

    const auditLoggerCfg: restify.plugins.AuditLoggerOptions = {
        event: 'after',
        log,
        server,
    };

    server.on('after', restify.plugins.auditLogger(auditLoggerCfg));
};
