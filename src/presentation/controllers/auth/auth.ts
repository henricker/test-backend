import { BusinessError } from '../../../domain/errors/business-error';
import { AuthOptions, IAuthUseCase } from '../../../domain/usecases/auth/auth';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { badRequest, ok, serverError } from '../../protocols/status-http';
import { IValidator } from '../../protocols/validator';

export class AuthController implements Controller {
  constructor(
    private readonly authUseCase: IAuthUseCase,
    private readonly validator: IValidator
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const payload = await this.validator.validate(request.body);

      if (typeof payload === 'string') {
        return badRequest(payload);
      }

      const data = await this.authUseCase.execute(payload as AuthOptions);

      return ok(data, 201);
    } catch (err) {
      if (err instanceof BusinessError) {
        return badRequest(err.message, err.statusCode);
      }

      return serverError();
    }
  }
}
