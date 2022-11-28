import { DbDeleteFavoritePokemons } from '../../../../../data/usecases/user/pokemon/db-delete-favorite-pokemons';
import { IDeleteFavoritePokemonsUseCase } from '../../../../../domain/usecases/user/pokemon/delete-favorite-pokemons';
import { prismaClient } from '../../../../../infra/db/prisma/client';
import { UserPrismaRepository } from '../../../../../infra/db/prisma/repositories/user-prisma-repository';

export const makeDeleteFavoritePokemonsUseCaseFactory =
  (): IDeleteFavoritePokemonsUseCase => {
    const userPrismaRepository = new UserPrismaRepository(prismaClient);
    return new DbDeleteFavoritePokemons(userPrismaRepository);
  };
