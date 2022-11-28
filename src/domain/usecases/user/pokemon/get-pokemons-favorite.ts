import { IPokemon } from '../../../entities/pokemon';
import { PaginationData } from '../../../util/pagination-data';

export type GetPokemonsFavoriteOptions = {
  page: number;
  limit: number;
  name?: string;
  userId: number;
};

export type ReturnGetPokemonFavorite = PaginationData<IPokemon>;

export interface IGetPokemonsFavoriteUseCase {
  execute(
    options: GetPokemonsFavoriteOptions
  ): Promise<ReturnGetPokemonFavorite>;
}
