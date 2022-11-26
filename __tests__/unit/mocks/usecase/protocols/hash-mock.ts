import { IHash } from '../../../../../src/data/protocols/hash';

export class HashMock implements IHash {
  generateHash(payload: string): Promise<string> {
    return Promise.resolve('hashed');
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
