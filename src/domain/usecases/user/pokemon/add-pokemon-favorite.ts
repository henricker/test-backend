import { IPokemon } from '../../../entities/pokemon';
import { PaginationData } from '../../../util/pagination-data';

export type AddPokemonFavoriteOptions = {
  pokemonsId: number[];
  userId: number;
};

export type ReturnAddPokemonFavorite = PaginationData<IPokemon>;

export interface IAddPokemonFavoriteUseCase {
  execute(options: AddPokemonFavoriteOptions): Promise<void>;
}
