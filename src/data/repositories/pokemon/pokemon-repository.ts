import { IPokemon } from '../../../domain/entities/pokemon';
import { getPokemonOptionsQuery } from '../../../domain/usecases/pokemon/get-pokemons-use-case';
import { PaginationData } from '../../../domain/util/pagination-data';

export interface IPokemonRepository {
  getPokemons(
    options: getPokemonOptionsQuery
  ): Promise<PaginationData<IPokemon>>;

  getPokemonById(id: number): Promise<IPokemon | null>;
}
