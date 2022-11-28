import {
  GetPokemonsFavoriteOptions,
  IGetPokemonsFavoriteUseCase,
  ReturnGetPokemonFavorite,
} from '../../../../../../src/domain/usecases/user/pokemon/get-pokemons-favorite';
import pokemonMock from '../../../entities/pokemon-mock';

export class GetFavoritePokemonsUseCaseMock
  implements IGetPokemonsFavoriteUseCase
{
  execute(
    options: GetPokemonsFavoriteOptions
  ): Promise<ReturnGetPokemonFavorite> {
    return Promise.resolve({
      data: [pokemonMock],
      meta: {
        total: 1,
        limit: 1,
        page: 1,
        hasNext: false,
      },
    });
  }
}
