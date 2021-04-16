import { fetch } from '../../model/users';

export const get = async (ctx, next) => {
  ctx.status = 200;
  const users = await fetch();
  const filtered = applyFilters(users, ctx.query);
  const fieldsFiltered = applyFieldsFilter(filtered, ctx.query);
  ctx.body = { users: fieldsFiltered };
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

const applyFieldsFilter = (users, params) => {
  if (params === undefined || params.fields === undefined || !Array.isArray(params.fields)) return users;
  return users.map((user) => {
    var obj = {};
    params.fields.forEach((field) => (obj[field] = user[field]));
    return obj;
  });
};
