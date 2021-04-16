import Router from '@koa/router';

export const routes = (app) => {
  let router = Router();
  router.get('/users', () => console.log('/users'));

  app.use(router.routes());
  app.use(router.allowedMethods());
};
