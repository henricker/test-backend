import {
  DeleteFavoritePokemonsOptions,
  IDeleteFavoritePokemonsUseCase,
} from '../../../../domain/usecases/user/pokemon/delete-favorite-pokemons';
import { IUserRepository } from '../../../repositories/user/user-repository';

export class DbDeleteFavoritePokemons
  implements IDeleteFavoritePokemonsUseCase
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(options: DeleteFavoritePokemonsOptions): Promise<void> {
    await this.userRepository.deleteFavoritePokemons(options);
  }
}
