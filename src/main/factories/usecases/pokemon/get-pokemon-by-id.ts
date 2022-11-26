import { prismaClient } from '../../../../infra/db/prisma/client';
import { PokemonPrismaRepository } from '../../../../infra/db/prisma/repositories/pokemon-prisma-repository';
import { DbGetPokemonByIdUseCase } from '../../../../data/usecases/pokemons/db-get-pokemon-by-id';
import { IGetPokemonByIdUseCase } from '../../../../domain/usecases/pokemon/get-pokemon-by-id';

export const makeGetPokemonByIdUseCase = (): IGetPokemonByIdUseCase => {
  const repository = new PokemonPrismaRepository(prismaClient);
  return new DbGetPokemonByIdUseCase(repository);
};
