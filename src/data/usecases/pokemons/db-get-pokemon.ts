import { IPokemon } from '../../../domain/entities/pokemon';
import {
  getPokemonOptionsQuery,
  IGetPokemonsUseCase,
} from '../../../domain/usecases/pokemon/get-pokemons';
import { PaginationData } from '../../../domain/util/pagination-data';
import { IPokemonRepository } from '../../repositories/pokemon/pokemon-repository';

export class DbGetPokemonUseCase implements IGetPokemonsUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  execute(options: getPokemonOptionsQuery): Promise<PaginationData<IPokemon>> {
    return this.pokemonRepository.getPokemons(options);
  }
}
