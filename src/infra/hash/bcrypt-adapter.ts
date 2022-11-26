import bcrypt from 'bcrypt';
import { IHash } from '../../data/protocols/hash';

export class BcryptHashAdapter implements IHash {
  generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 8);
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
