import { AuthValidator } from '../../../../infra/validators/auth/auth';
import { AuthController } from '../../../../presentation/controllers/auth/auth';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeAuthUseCaseFactory } from '../../usecases/auth/auth';

export const makeAuthControllerFactory = (): Controller =>
  new AuthController(makeAuthUseCaseFactory(), new AuthValidator());
