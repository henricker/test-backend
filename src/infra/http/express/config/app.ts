import express, { Express } from 'express';
import configRoutes from './routes';
import configMiddlewares from './middleware';

export const setupApp = (): Express => {
  const app = express();
  configMiddlewares(app);
  configRoutes(app);
  return app;
};
