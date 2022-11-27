import { IJwt } from '../../../../../src/data/protocols/jwt';

export class JwtMock implements IJwt {
  verify(token: string): Promise<{}> {
    return Promise.resolve({ id: 1 });
  }

  async sign(payload: string): Promise<string> {
    return Promise.resolve('token');
  }
}
