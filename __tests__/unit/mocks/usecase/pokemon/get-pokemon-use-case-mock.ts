import { IPokemon } from '../../../../../src/domain/entities/pokemon';
import {
  getPokemonOptionsQuery,
  IGetPokemonsUseCase,
} from '../../../../../src/domain/usecases/pokemon/get-pokemons';
import { PaginationData } from '../../../../../src/domain/util/pagination-data';
import pokemonMock from '../../entities/pokemon-mock';

export class GetPokemonUseCaseMock implements IGetPokemonsUseCase {
  execute(options: getPokemonOptionsQuery): Promise<PaginationData<IPokemon>> {
    return Promise.resolve({
      meta: {
        total: 1,
        limit: 1,
        page: 1,
        hasNext: false,
      },
      data: [pokemonMock],
    });
  }
}
