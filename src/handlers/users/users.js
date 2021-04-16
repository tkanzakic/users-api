import { fetch } from '../../model/users';

export const get = async (ctx, next) => {
  ctx.status = 200;
  const users = await fetch();
  ctx.body = { users };
  await next();
  return ctx.body;
};
