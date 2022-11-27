import { DbGetUserByTokenUseCase } from '../../../../data/usecases/user/db-get-user-by-token';
import { JwtAdapter } from '../../../../infra/auth-token/jwt-adaptert';
import { prismaClient } from '../../../../infra/db/prisma/client';
import { UserPrismaRepository } from '../../../../infra/db/prisma/repositories/user-prisma-repository';

export const makeGetUserByTokenUseCaseFactory = () => {
  const userRepository = new UserPrismaRepository(prismaClient);
  const jwt = new JwtAdapter();
  return new DbGetUserByTokenUseCase(userRepository, jwt);
};
