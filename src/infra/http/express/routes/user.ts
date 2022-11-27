import { Router } from 'express';
import { expressAdapterRoute } from '../../../../main/adapters/express-route-adapter';
import { makeCreateUserControllerFactory } from '../../../../main/factories/controllers/user/create-user';

export default (router: Router): void => {
  router.post('/users', expressAdapterRoute(makeCreateUserControllerFactory()));
};
