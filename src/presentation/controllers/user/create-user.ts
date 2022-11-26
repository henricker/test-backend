import { BusinessError } from '../../../domain/errors/business-error';
import {
  createUserOptions,
  ICreateUserUseCase,
} from '../../../domain/usecases/user/create-user';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { badRequest, ok, serverError } from '../../protocols/status-http';
import { IValidator } from '../../protocols/validator';

export class CreateUserController implements Controller {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly validator: IValidator
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const payload = await this.validator.validate(request.body);

      if (typeof payload === 'string') {
        return badRequest(payload);
      }

      const data = await this.createUserUseCase.execute(
        payload as createUserOptions
      );

      return ok(data);
    } catch (err) {
      if (err instanceof BusinessError) {
        return badRequest(err.message);
      }

      return serverError();
    }
  }
}
