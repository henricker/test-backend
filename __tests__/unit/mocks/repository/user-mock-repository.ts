import { IUserRepository } from '../../../../src/data/repositories/user/user-repository';
import { IUser } from '../../../../src/domain/entities/user';
import {
  createUserOptions,
  ReturnCreateUser,
} from '../../../../src/domain/usecases/user/create-user';
import { userMock } from '../entities/user-mock';

export class UserMockRepository implements IUserRepository {
  createUser(user: createUserOptions): Promise<IUser> {
    return Promise.resolve(userMock);
  }

  findUserByEmail(email: string): Promise<IUser | null> {
    return Promise.resolve(userMock);
  }

  findUserByUsername(username: string): Promise<IUser | null> {
    return Promise.resolve(userMock);
  }
}
