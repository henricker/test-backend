import { Router } from 'express';
import { expressAdapterRoute } from '../../../main/adapters/express-route-adapter';
import { makeGetPokemonByIdController } from '../../../main/factories/controllers/pokemon/get-pokemon-by-id';
import { makeGetPokemonsController } from '../../../main/factories/controllers/pokemon/get-pokemons';

export default (router: Router): void => {
  router.get('/pokemons', expressAdapterRoute(makeGetPokemonsController()));
  router.get(
    '/pokemons/:id',
    expressAdapterRoute(makeGetPokemonByIdController())
  );
};
