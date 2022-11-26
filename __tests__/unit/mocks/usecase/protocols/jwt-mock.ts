import { IJwt } from '../../../../../src/data/protocols/jwt';

export class JwtMock implements IJwt {
  verify(token: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async sign(payload: string): Promise<string> {
    return Promise.resolve('token');
  }
}
