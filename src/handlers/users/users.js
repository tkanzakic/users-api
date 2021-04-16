import { fetch } from '../../model/users';

export const get = async (ctx, next) => {
  ctx.status = 200;
  const users = await fetch();
  const filtered = applyFilters(users, ctx.query);
  ctx.body = { users: filtered };
  await next();
  return ctx.body;
};

const applyFilters = (users, params) => {
  if (params === undefined) return users;
  var filtered = users;
  if (params.emailContains) {
    filtered = filtered.filter((user) => user.email.includes(params.emailContains));
  }
  return filtered;
};
