import {
  IDeleteFavoritePokemonsUseCase,
  DeleteFavoritePokemonsOptions,
} from '../../../../../../src/domain/usecases/user/pokemon/delete-favorite-pokemons';

export class DeleteFavoritePokemonsUseCaseMock
  implements IDeleteFavoritePokemonsUseCase
{
  async execute(options: DeleteFavoritePokemonsOptions): Promise<void> {}
}
