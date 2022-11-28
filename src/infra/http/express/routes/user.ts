import { Router } from 'express';
import { expressAdapterRoute } from '../../../../main/adapters/express-route-adapter';
import { makeCreateUserControllerFactory } from '../../../../main/factories/controllers/user/create-user';
import { makeAddFavoritePokemonsControllerFactory } from '../../../../main/factories/controllers/user/pokemons/add-favorite-pokemons';
import { makeDeleteFavoritePokemonsControllerFactory } from '../../../../main/factories/controllers/user/pokemons/delete-favorite-pokemons';
import { makeGetFavoritePokemonsControllerFactory } from '../../../../main/factories/controllers/user/pokemons/get-favorite-pokemons';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.post('/users', expressAdapterRoute(makeCreateUserControllerFactory()));
  router.post(
    '/users/pokemons',
    auth,
    expressAdapterRoute(makeAddFavoritePokemonsControllerFactory())
  );
  router.get(
    '/users/pokemons',
    auth,
    expressAdapterRoute(makeGetFavoritePokemonsControllerFactory())
  );
  router.delete(
    '/users/pokemons',
    auth,
    expressAdapterRoute(makeDeleteFavoritePokemonsControllerFactory())
  );
};
