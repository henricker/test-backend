import { IPokemon } from '../../../../src/domain/entities/pokemon';
import {
  getPokemonOptionsQuery,
  IGetPokemonsUseCase,
} from '../../../../src/domain/usecases/pokemon/get-pokemons-use-case';
import { PaginationData } from '../../../../src/domain/util/pagination-data';

export class GetPokemonUseCaseMock implements IGetPokemonsUseCase {
  execute(options: getPokemonOptionsQuery): Promise<PaginationData<IPokemon>> {
    return Promise.resolve({
      meta: {
        total: 1,
        limit: 1,
        page: 1,
        hasNext: false,
      },
      data: [],
    });
  }
}
