import jwt from 'jsonwebtoken';
import { IJwt } from '../../data/protocols/jwt';
import { BusinessError } from '../../domain/errors/business-error';

export class JwtAdapter implements IJwt {
  sign(payload: any): Promise<string> {
    try {
      return Promise.resolve(jwt.sign(payload, process.env.JWT_SECRET_KEY));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  verify(token: string): Promise<string | {}> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
          reject(new BusinessError('Invalid token provided', 401));
        }
        resolve(decoded);
      });
    });
  }
}
