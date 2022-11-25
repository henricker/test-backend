import { GetPokemonValidator } from '../../../../infra/validators/pokemon/get-pokemon-validator';
import { GetPokemonsController } from '../../../../presentation/controllers/get-pokemons-controller';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeGetPokemonUseCase } from '../../usecases/pokemon/get-pokemon-use-case-factory';

export const makeGetPokemonsController = (): Controller => {
  const validator = new GetPokemonValidator();
  const controller = new GetPokemonsController(
    makeGetPokemonUseCase(),
    validator
  );
  return controller;
};
