export const put = async (ctx, next) => {
  ctx.status = 200;
  ctx.body = { users: [] };
  await next();
  return ctx.body;
};
