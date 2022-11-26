import { PrismaClient } from '@prisma/client';
import { IPokemonRepository } from '../../../../data/repositories/pokemon/pokemon-repository';
import { IPokemon } from '../../../../domain/entities/pokemon';
import { getPokemonOptionsQuery } from '../../../../domain/usecases/pokemon/get-pokemons-use-case';
import { PaginationData } from '../../../../domain/util/pagination-data';

export class PokemonPrismaRepository implements IPokemonRepository {
  constructor(private readonly connection: PrismaClient) {}

  async getPokemons(
    options: getPokemonOptionsQuery
  ): Promise<PaginationData<IPokemon>> {
    const where = {
      name: options?.name,
      pokemonEvolutionInfo: {
        evolutionStage: options?.evolutionStage,
        envolved: options?.evolved,
        familyId: options?.familyId,
      },
      type: {
        some: {
          name: options?.type,
        },
      },
      weather: {
        some: {
          name: options?.weather,
        },
      },
    };

    const data = await this.connection.pokemon.findMany({
      where,
      include: {
        powerStatus: true,
        pokemonEvolutionInfo: true,
        pokemonCharacteristics: true,
        type: {
          select: {
            name: true,
          },
        },
        weather: {
          select: {
            name: true,
          },
        },
      },
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });

    const total = await this.connection.pokemon.count({
      where,
    });

    return {
      data,
      meta: {
        total,
        limit: options.limit,
        page: options.page,
        hasNext: total > options.limit * options.page,
      },
    };
  }

  async getPokemonById(id: number): Promise<IPokemon | null> {
    return this.connection.pokemon.findUnique({
      where: {
        id,
      },
      include: {
        powerStatus: true,
        pokemonEvolutionInfo: true,
        pokemonCharacteristics: true,
        type: {
          select: {
            name: true,
          },
        },
        weather: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
