import { Router } from 'express';
import { expressAdapterRoute } from '../../../main/adapters/express-route-adapter';
import { makeGetPokemonsController } from '../../../main/factories/controllers/pokemon/get-pokemons-controller-factory';

export default (router: Router): void => {
  router.get('/pokemons', expressAdapterRoute(makeGetPokemonsController()));
};
