import { Router } from 'express';
import { expressAdapterRoute } from '../../../../main/adapters/express-route-adapter';
import { makeCreateUserControllerFactory } from '../../../../main/factories/controllers/user/create-user';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.post('/users', expressAdapterRoute(makeCreateUserControllerFactory()));
  router.post('/users/pokemon', auth, (req, res) => {
    res.send(req.user);
  });
  router.get('/users/pokemon', auth, (req, res) => {
    res.send(req.user);
  });
};
