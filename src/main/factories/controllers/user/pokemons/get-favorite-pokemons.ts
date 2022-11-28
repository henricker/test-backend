import { GetFavoritePokemonsValidator } from '../../../../../infra/validators/user/pokemons/get-pokemon-favorites';
import { GetFavoritePokemonsController } from '../../../../../presentation/controllers/user/pokemons/get-favorite-pokemons';
import { Controller } from '../../../../../presentation/protocols/controller';
import { makeGetFavoritePokemonsUseCaseFactory } from '../../../usecases/user/pokemons/get-favorite-pokemons';

export const makeGetFavoritePokemonsControllerFactory = (): Controller =>
  new GetFavoritePokemonsController(
    makeGetFavoritePokemonsUseCaseFactory(),
    new GetFavoritePokemonsValidator()
  );
