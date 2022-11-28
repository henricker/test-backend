import { IPokemon } from '../../../domain/entities/pokemon';
import { IUser } from '../../../domain/entities/user';
import { createUserOptions } from '../../../domain/usecases/user/create-user';
import { AddPokemonFavoriteOptions } from '../../../domain/usecases/user/pokemon/add-pokemon-favorite';
import { GetPokemonsFavoriteOptions } from '../../../domain/usecases/user/pokemon/get-pokemons-favorite';
import { PaginationData } from '../../../domain/util/pagination-data';

export interface IUserRepository {
  createUser(user: createUserOptions): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserByUsername(username: string): Promise<IUser | null>;
  findUserById(id: number): Promise<IUser | null>;
  findFavoritesPokemons(
    options: GetPokemonsFavoriteOptions
  ): Promise<PaginationData<IPokemon> | null>;
  addPokemonsFavorite(options: AddPokemonFavoriteOptions): Promise<void>;
}
