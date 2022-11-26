import jwt from 'jsonwebtoken';
import { IJwt } from '../../data/protocols/jwt';

export class JwtAdapter implements IJwt {
  sign(payload: any): Promise<string> {
    try {
      return Promise.resolve(jwt.sign(payload, process.env.JWT_SECRET_KEY));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  verify(token: string): Promise<string | {}> {
    try {
      return Promise.resolve(jwt.verify(token, process.env.JWT_SECRET_KEY));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
