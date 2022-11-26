import { IPokemonRepository } from '../../../../src/data/repositories/pokemon/pokemon-repository';
import { IPokemon } from '../../../../src/domain/entities/pokemon';
import { getPokemonOptionsQuery } from '../../../../src/domain/usecases/pokemon/get-pokemons';
import { PaginationData } from '../../../../src/domain/util/pagination-data';
import pokemonMock from '../entities/pokemon-mock';

export class PokemonMockRepository implements IPokemonRepository {
  getPokemons(
    options: getPokemonOptionsQuery
  ): Promise<PaginationData<IPokemon>> {
    return new Promise((resolve) => {
      resolve({
        meta: {
          total: 1,
          limit: 1,
          page: 1,
          hasNext: false,
        },
        data: [pokemonMock] as unknown as IPokemon[],
      });
    });
  }

  getPokemonById(id: number): Promise<IPokemon> {
    return new Promise((resolve) => {
      resolve(pokemonMock as unknown as IPokemon);
    });
  }
}
