import { IUser } from '../../../domain/entities/user';
import { createUserOptions } from '../../../domain/usecases/user/create-user';

export interface IUserRepository {
  createUser(user: createUserOptions): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserByUsername(username: string): Promise<IUser | null>;
  findUserById(id: number): Promise<IUser | null>;
}
