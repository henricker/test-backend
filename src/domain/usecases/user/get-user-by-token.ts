import { IUser } from '../../entities/user';

export interface IGetUserByTokenUseCase {
  execute(token: string): Promise<Omit<IUser, 'password'>>;
}
