import { IGetPokemonsUseCase } from '../../../../domain/usecases/pokemon/get-pokemons-use-case';
import { prismaClient } from '../../../../infra/db/prisma/client';
import { PokemonPrismaRepository } from '../../../../infra/db/prisma/repositories/pokemon-prisma-repository';
import { DbGetPokemonUseCase } from '../../../../data/usecases/pokemons/db-get-pokemon';

export const makeGetPokemonUseCase = (): IGetPokemonsUseCase => {
  const repository = new PokemonPrismaRepository(prismaClient);
  return new DbGetPokemonUseCase(repository);
};
