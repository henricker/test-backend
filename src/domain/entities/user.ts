import { IPokemon } from './pokemon';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  favoritesPokemons?: IPokemon[];
}
