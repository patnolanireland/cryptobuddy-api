import * as restify from 'restify';

const restricted =
    (req: restify.Request, res: restify.Response, next: restify.Next) =>  {
    res.send(200, {
        msg: 'This resource requires authorization, congratulations!',
    });
    return next();
};

export const bootstrap = (server: restify.Server): void => {
    server.get('/restricted', restricted);
};
