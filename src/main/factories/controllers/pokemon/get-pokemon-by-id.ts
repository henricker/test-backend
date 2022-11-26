import { GetPokemonByIDController } from '../../../../presentation/controllers/get-pokemon-by-id';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeGetPokemonByIdUseCase } from '../../usecases/pokemon/get-pokemon-by-id';

export const makeGetPokemonByIdController = (): Controller => {
  const controller = new GetPokemonByIDController(makeGetPokemonByIdUseCase());
  return controller;
};
