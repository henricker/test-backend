import {
  AddPokemonFavoriteOptions,
  IAddPokemonFavoriteUseCase,
} from '../../../../../../src/domain/usecases/user/pokemon/add-pokemon-favorite';

export class AddFavoritePokemonsUseCaseMock
  implements IAddPokemonFavoriteUseCase
{
  async execute(options: AddPokemonFavoriteOptions): Promise<void> {}
}
