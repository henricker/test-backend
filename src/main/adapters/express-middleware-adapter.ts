import { NextFunction, Request, Response } from 'express';
import { Middleware } from '../../presentation/protocols/middleware';

export const adaptMiddleware =
  (middleware: Middleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: { ...req.headers, authorization: req.headers.authorization },
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      Reflect.set(req, 'user', httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
