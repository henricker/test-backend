import { CreateUserValidator } from '../../../../infra/validators/user/create-user';
import { CreateUserController } from '../../../../presentation/controllers/user/create-user';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeCreateUserUseCaseFactory } from '../../usecases/user/create-user';

export const makeCreateUserControllerFactory = (): Controller =>
  new CreateUserController(
    makeCreateUserUseCaseFactory(),
    new CreateUserValidator()
  );
