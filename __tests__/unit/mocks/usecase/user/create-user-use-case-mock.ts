import {
  createUserOptions,
  ICreateUserUseCase,
  ReturnCreateUser,
} from '../../../../../src/domain/usecases/user/create-user';
import { userMock } from '../../entities/user-mock';

export class CreateUserUseCaseMock implements ICreateUserUseCase {
  execute(options: createUserOptions): Promise<ReturnCreateUser> {
    return Promise.resolve({
      user: { ...userMock, password: undefined },
      token: 'token',
    });
  }
}
