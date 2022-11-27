import { AuthMiddleware } from '../../../presentation/middlewares/auth';
import { Middleware } from '../../../presentation/protocols/middleware';
import { makeGetUserByTokenUseCaseFactory } from '../usecases/user/get-user-by-token';

export const makeAuthMiddlewareFactory = (): Middleware =>
  new AuthMiddleware(makeGetUserByTokenUseCaseFactory());
