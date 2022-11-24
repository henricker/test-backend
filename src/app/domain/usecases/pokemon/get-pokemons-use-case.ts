import { IPokemon } from '../../entities/pokemon';
import { PaginationData } from '../../util/pagination-data';

export type getPokemonOptionsQuery = {
  limit: number;
  page: number;
  name?: string;
  type?: string;
  evolutionStage?: number;
  evolved?: boolean;
  familyId?: number;
  weather?: string;
};

export interface IGetPokemonsUseCase {
  execute(options: getPokemonOptionsQuery): Promise<PaginationData<IPokemon>>;
}
