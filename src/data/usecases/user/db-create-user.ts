import { BusinessError } from '../../../domain/errors/business-error';
import {
  createUserOptions,
  ICreateUserUseCase,
  ReturnCreateUser,
} from '../../../domain/usecases/user/create-user';
import { IHash } from '../../protocols/hash';
import { IJwt } from '../../protocols/jwt';
import { IUserRepository } from '../../repositories/user/user-repository';

export class DbCreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHash,
    private readonly jwtService: IJwt
  ) {}

  async execute(options: createUserOptions): Promise<ReturnCreateUser> {
    const emailAlreadyExists = await this.userRepository.findUserByEmail(
      options.email
    );

    if (emailAlreadyExists) {
      throw new BusinessError('Email already in use');
    }

    const usernameAlreadyExists = await this.userRepository.findUserByUsername(
      options.username
    );

    if (usernameAlreadyExists) {
      throw new BusinessError('Username already in use');
    }

    const hashedPassword = await this.hashService.generateHash(
      options.password
    );

    const user = await this.userRepository.createUser({
      ...options,
      password: hashedPassword,
    });

    Reflect.deleteProperty(user, 'password');

    const token = await this.jwtService.sign({
      id: user.id,
    });

    return {
      user,
      token,
    };
  }
}
