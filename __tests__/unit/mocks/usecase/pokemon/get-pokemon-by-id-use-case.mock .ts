import { IPokemon } from '../../../../../src/domain/entities/pokemon';
import { IGetPokemonByIdUseCase } from '../../../../../src/domain/usecases/pokemon/get-pokemon-by-id';
import pokemonMock from '../../entities/pokemon-mock';

export class GetPokemonByIDUseCaseMock implements IGetPokemonByIdUseCase {
  execute(id: number): Promise<IPokemon | null> {
    return Promise.resolve(pokemonMock);
  }
}
