import { DbAuthUseCase } from '../../../../data/usecases/auth/db-auth';
import { IAuthUseCase } from '../../../../domain/usecases/auth/auth';
import { JwtAdapter } from '../../../../infra/auth-token/jwt-adaptert';
import { prismaClient } from '../../../../infra/db/prisma/client';
import { UserPrismaRepository } from '../../../../infra/db/prisma/repositories/user-prisma-repository';
import { BcryptHashAdapter } from '../../../../infra/hash/bcrypt-adapter';

export const makeAuthUseCaseFactory = (): IAuthUseCase => {
  const repository = new UserPrismaRepository(prismaClient);
  const hash = new BcryptHashAdapter();
  const jwt = new JwtAdapter();
  return new DbAuthUseCase(repository, hash, jwt);
};
