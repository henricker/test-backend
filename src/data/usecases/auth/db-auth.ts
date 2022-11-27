import { BusinessError } from '../../../domain/errors/business-error';
import {
  AuthOptions,
  AuthResult,
  IAuthUseCase,
} from '../../../domain/usecases/auth/auth';
import { IHash } from '../../protocols/hash';
import { IJwt } from '../../protocols/jwt';
import { IUserRepository } from '../../repositories/user/user-repository';

export class DbAuthUseCase implements IAuthUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHash,
    private readonly jwtService: IJwt
  ) {}

  async execute(options: AuthOptions): Promise<AuthResult> {
    const user = await this.userRepository.findUserByEmail(options.email);

    if (!user) {
      throw new BusinessError('User not found', 401);
    }

    const isValidPassword = await this.hashService.compareHash(
      options.password,
      user.password
    );

    if (!isValidPassword) {
      throw new BusinessError('Invalid password', 401);
    }

    const token = await this.jwtService.sign(user.id);
    Reflect.deleteProperty(user, 'password');

    return {
      user,
      token,
    };
  }
}
