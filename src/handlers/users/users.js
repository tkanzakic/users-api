import { fetch } from '../../model/users';
import { calcCrow } from '../../utils/distance';

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
  return applyDistanceFilter(applyEmailFilter(users, params), params);
};

const applyEmailFilter = (users, params) => {
  if (params.emailContains) {
    return users.filter((user) => user.email.includes(params.emailContains));
  } else {
    return users;
  }
};

const applyDistanceFilter = (users, params) => {
  if (!Array.isArray(params.coordinate) || params.coordinate.length !== 2) return users;
  const radius = params.radius || 10;
  const [latitude, longitude] = params.coordinate;
  return users.filter((user) => {
    const distance = calcCrow(user.address.geo.lat, user.address.geo.lng, latitude, longitude);
    return distance <= radius;
  });
};

const applyFieldsFilter = (users, params) => {
  if (params === undefined || !Array.isArray(params.fields)) return users;
  return users.map((user) => {
    var obj = {};
    params.fields.forEach((field) => (obj[field] = user[field]));
    return obj;
  });
};
