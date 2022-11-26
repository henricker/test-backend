import { GetPokemonValidator } from '../../../../infra/validators/pokemon/get-pokemon';
import { GetPokemonsController } from '../../../../presentation/controllers/pokemon/get-pokemons';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeGetPokemonUseCase } from '../../usecases/pokemon/get-pokemon';

export const makeGetPokemonsController = (): Controller => {
  const validator = new GetPokemonValidator();
  const controller = new GetPokemonsController(
    makeGetPokemonUseCase(),
    validator
  );
  return controller;
};
