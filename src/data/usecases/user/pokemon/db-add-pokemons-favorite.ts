import {
  AddPokemonFavoriteOptions,
  IAddPokemonFavoriteUseCase,
} from '../../../../domain/usecases/user/pokemon/add-pokemon-favorite';
import { IUserRepository } from '../../../repositories/user/user-repository';

export class DbAddPokemonsFavorite implements IAddPokemonFavoriteUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(options: AddPokemonFavoriteOptions): Promise<void> {
    await this.userRepository.addPokemonsFavorite(options);
  }
}
