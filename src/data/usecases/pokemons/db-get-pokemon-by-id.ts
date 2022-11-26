import { IPokemon } from '../../../domain/entities/pokemon';
import { IGetPokemonByIdUseCase } from '../../../domain/usecases/pokemon/get-pokemon-by-id';
import { IPokemonRepository } from '../../repositories/pokemon/pokemon-repository';

export class DbGetPokemonByIdUseCase implements IGetPokemonByIdUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  execute(id: number): Promise<IPokemon | null> {
    return this.pokemonRepository.getPokemonById(id);
  }
}
