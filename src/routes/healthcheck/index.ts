import * as restify from 'restify';

const healthcheck =
    (req: restify.Request, res: restify.Response) =>  {
        res.send(200, {
            mid: process.env.HOSTNAME || '42',
        });
    };

export const bootstrap = (server: restify.Server): void => {
    server.head('/healthcheck', healthcheck);
    server.get('/healthcheck', healthcheck);
};
