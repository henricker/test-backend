import { DbAddPokemonsFavorite } from '../../../../../data/usecases/user/pokemon/db-add-pokemons-favorite';
import { IAddPokemonFavoriteUseCase } from '../../../../../domain/usecases/user/pokemon/add-pokemon-favorite';
import { prismaClient } from '../../../../../infra/db/prisma/client';
import { UserPrismaRepository } from '../../../../../infra/db/prisma/repositories/user-prisma-repository';

export const makeAddFavoritePokemonsUseCaseFactory =
  (): IAddPokemonFavoriteUseCase =>
    new DbAddPokemonsFavorite(new UserPrismaRepository(prismaClient));
