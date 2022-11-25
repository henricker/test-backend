import { IPokemonRepository } from '../../../../src/app/data/repositories/pokemon/pokemon-repository';
import { IPokemon } from '../../../../src/app/domain/entities/pokemon';
import { getPokemonOptionsQuery } from '../../../../src/app/domain/usecases/pokemon/get-pokemons-use-case';
import { PaginationData } from '../../../../src/app/domain/util/pagination-data';

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
        data: [
          {
            id: 1,
            pokedexNumber: 1,
            name: 'Bulbasaur',
          },
        ] as unknown as IPokemon[],
      });
    });
  }
}
