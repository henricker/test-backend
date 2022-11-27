import { adaptMiddleware } from '../../../../main/adapters/express-middleware-adapter';
import { makeAuthMiddlewareFactory } from '../../../../main/factories/middlewares/auth';

export const auth = adaptMiddleware(makeAuthMiddlewareFactory());
