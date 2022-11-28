import { AddFavoritePokemonsValidator } from '../../../../../infra/validators/user/pokemons/add-favorite-pokemons';
import { AddFavoritePokemonsController } from '../../../../../presentation/controllers/user/pokemons/add-favorite-pokemons';
import { Controller } from '../../../../../presentation/protocols/controller';
import { makeAddFavoritePokemonsUseCaseFactory } from '../../../usecases/user/pokemons/add-favorite-pokemons';

export const makeAddFavoritePokemonsControllerFactory = (): Controller =>
  new AddFavoritePokemonsController(
    makeAddFavoritePokemonsUseCaseFactory(),
    new AddFavoritePokemonsValidator()
  );
