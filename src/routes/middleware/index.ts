import * as bunyan from 'bunyan';
import * as config from 'config';
import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import * as jwt from 'restify-jwt-community';

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
    server.use(jwt(jwtConfig).unless(whitelistConfig));
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

const jwtConfig = {
    secret: config.get('Server.authSecret'),
};

/* The whitelist configruation allows certain routes to remain unauthenticated.
 * As a result of applying this config in conjunction with JWT we enforce a valid
 * token.
 *
 * As a resource for explaining regular expressions checkout https://regex101.com/
 * The auth regex essentailly allows routes containing beginning with
 * auth, auth/level1/level2 to pass through unauthenticated.
 * e.g.
 * auth/faceebook
 * auth/facebook/callback
 * */
const whitelistConfig = {
    path: ['/', '/healthcheck', /exchanges\/kraken\/.*/i],
};
