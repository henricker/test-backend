import {
  AuthOptions,
  AuthResult,
  IAuthUseCase,
} from '../../../../../src/domain/usecases/auth/auth';
import { userMock } from '../../entities/user-mock';

export class AuthMockUseCase implements IAuthUseCase {
  execute(_: AuthOptions): Promise<AuthResult> {
    return Promise.resolve({
      user: { ...userMock, password: undefined },
      token: 'token',
    });
  }
}
