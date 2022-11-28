import {
  GetPokemonsFavoriteOptions,
  IGetPokemonsFavoriteUseCase,
  ReturnGetPokemonFavorite,
} from '../../../../domain/usecases/user/pokemon/get-pokemons-favorite';
import { IValidator } from '../../../../presentation/protocols/validator';
import { IUserRepository } from '../../../repositories/user/user-repository';

export class DbGetFavoritePokemons implements IGetPokemonsFavoriteUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(
    options: GetPokemonsFavoriteOptions
  ): Promise<ReturnGetPokemonFavorite> {
    return this.userRepository.findFavoritesPokemons(options);
  }
}
