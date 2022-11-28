import { IUserRepository } from '../../../../src/data/repositories/user/user-repository';
import { IPokemon } from '../../../../src/domain/entities/pokemon';
import { IUser } from '../../../../src/domain/entities/user';
import {
  createUserOptions,
  ReturnCreateUser,
} from '../../../../src/domain/usecases/user/create-user';
import { AddPokemonFavoriteOptions } from '../../../../src/domain/usecases/user/pokemon/add-pokemon-favorite';
import { PaginationData } from '../../../../src/domain/util/pagination-data';
import { userMock } from '../entities/user-mock';
import pokemonMock from '../entities/pokemon-mock';
import { GetPokemonsFavoriteOptions } from '../../../../src/domain/usecases/user/pokemon/get-pokemons-favorite';
import { DeleteFavoritePokemonsOptions } from '../../../../src/domain/usecases/user/pokemon/delete-favorite-pokemons';

export class UserMockRepository implements IUserRepository {
  async deleteFavoritePokemons(
    options: DeleteFavoritePokemonsOptions
  ): Promise<void> {}

  async addPokemonsFavorite(
    options: AddPokemonFavoriteOptions
  ): Promise<void> {}

  findFavoritesPokemons(
    options: GetPokemonsFavoriteOptions
  ): Promise<PaginationData<IPokemon> | null> {
    return Promise.resolve({
      data: [pokemonMock],
      meta: {
        total: 1,
        page: 1,
        limit: 1,
        hasNext: false,
      },
    });
  }

  createUser(user: createUserOptions): Promise<IUser> {
    return Promise.resolve(userMock);
  }

  findUserByEmail(email: string): Promise<IUser | null> {
    return Promise.resolve(userMock);
  }

  findUserByUsername(username: string): Promise<IUser | null> {
    return Promise.resolve(userMock);
  }

  findUserById(id: number): Promise<IUser | null> {
    return Promise.resolve(userMock);
  }
}
