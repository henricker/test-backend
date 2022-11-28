import { DeleteFavoritePokemonsValidator } from '../../../../../infra/validators/user/pokemons/delete-favorite-pokemons';
import { DeleteFavoritePokemonsController } from '../../../../../presentation/controllers/user/pokemons/delete-favorite-pokemons';
import { Controller } from '../../../../../presentation/protocols/controller';
import { makeDeleteFavoritePokemonsUseCaseFactory } from '../../../usecases/user/pokemons/delete-favorite-pokemons';

export const makeDeleteFavoritePokemonsControllerFactory = (): Controller => {
  const validator = new DeleteFavoritePokemonsValidator();

  return new DeleteFavoritePokemonsController(
    makeDeleteFavoritePokemonsUseCaseFactory(),
    validator
  );
};
