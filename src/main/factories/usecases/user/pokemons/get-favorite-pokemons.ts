import { DbGetFavoritePokemons } from '../../../../../data/usecases/user/pokemon/db-get-favorite-pokemons';
import { IGetPokemonsFavoriteUseCase } from '../../../../../domain/usecases/user/pokemon/get-pokemons-favorite';
import { prismaClient } from '../../../../../infra/db/prisma/client';
import { UserPrismaRepository } from '../../../../../infra/db/prisma/repositories/user-prisma-repository';

export const makeGetFavoritePokemonsUseCaseFactory =
  (): IGetPokemonsFavoriteUseCase => {
    const repository = new UserPrismaRepository(prismaClient);
    return new DbGetFavoritePokemons(repository);
  };
