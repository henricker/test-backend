import { IUser } from '../../entities/user';

export type createUserOptions = {
  username: string;
  email: string;
  password: string;
};

export type ReturnCreateUser = {
  user: Omit<IUser, 'password'>;
  token: string;
};

export interface ICreateUserUseCase {
  execute(options: createUserOptions): Promise<ReturnCreateUser>;
}
