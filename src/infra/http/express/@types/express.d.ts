import { IUser } from '../../../../domain/entities/user';

declare global {
  namespace Express {
    interface Request {
      user: Omit<IUser, 'password'>;
    }
  }
}
