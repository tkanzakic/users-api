import Router from '@koa/router';
import * as users from '../handlers/users';

export const routes = (app) => {
  let router = Router();
  router.put('/users', users.put);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
