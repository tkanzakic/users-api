import Router from '@koa/router';
import * as users from '../handlers/users';

export const routes = (app) => {
  let router = Router();
  router.get('/users', users.get);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
