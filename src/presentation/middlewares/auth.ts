import { BusinessError } from '../../domain/errors/business-error';
import { IGetUserByTokenUseCase } from '../../domain/usecases/user/get-user-by-token';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';
import { badRequest, ok, serverError } from '../protocols/status-http';

export class AuthMiddleware implements Middleware {
  constructor(private readonly getUserByTokenUseCase: IGetUserByTokenUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.authorization?.split(' ')[1];
      const user = await this.getUserByTokenUseCase.execute(token);
      return ok(user);
    } catch (err) {
      if (err instanceof BusinessError) {
        return badRequest(err.message, err.statusCode);
      }

      return serverError();
    }
  }
}
