import { IUser } from '../../../../../src/domain/entities/user';
import { IGetUserByTokenUseCase } from '../../../../../src/domain/usecases/user/get-user-by-token';
import { userMock } from '../../entities/user-mock';

export class GetUserByTokenUseCaseMock implements IGetUserByTokenUseCase {
  execute(token: string): Promise<IUser> {
    const user = { ...userMock };
    Reflect.deleteProperty(user, 'password');
    return Promise.resolve(user);
  }
}
