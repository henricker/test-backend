import { DbCreateUserUseCase } from '../../../../data/usecases/user/db-create-user';
import { ICreateUserUseCase } from '../../../../domain/usecases/user/create-user';
import { JwtAdapter } from '../../../../infra/auth-token/jwt-adaptert';
import { prismaClient } from '../../../../infra/db/prisma/client';
import { UserPrismaRepository } from '../../../../infra/db/prisma/repositories/user-prisma-repository';
import { BcryptHashAdapter } from '../../../../infra/hash/bcrypt-adapter';

export const makeCreateUserUseCaseFactory = (): ICreateUserUseCase => {
  const repository = new UserPrismaRepository(prismaClient);
  const hashService = new BcryptHashAdapter();
  const jwtService = new JwtAdapter();
  return new DbCreateUserUseCase(repository, hashService, jwtService);
};
