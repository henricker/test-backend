import { Router } from 'express';
import { expressAdapterRoute } from '../../../../main/adapters/express-route-adapter';
import { makeAuthControllerFactory } from '../../../../main/factories/controllers/auth/auth';

export default (router: Router): void => {
  router.post('/auth', expressAdapterRoute(makeAuthControllerFactory()));
};
