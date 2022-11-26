import { IPokemon } from '../../entities/pokemon';

export interface IGetPokemonByIdUseCase {
  execute(id: number): Promise<IPokemon | null>;
}
