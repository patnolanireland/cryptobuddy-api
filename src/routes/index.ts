import * as restify from 'restify';
import { bootstrap as bootstrapHealthCheck } from './healthcheck';
import { bootstrap as bootstrapMiddleware } from './middleware';

export const bootstrap = (server: restify.Server) => {
    bootstrapMiddleware(server);
    bootstrapHealthCheck(server);
};
