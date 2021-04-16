const expectedHeader = 'x-bundle-access-token';
const expectedValue = 'token';

export const authenticate = async (ctx, next) => {
  const givenToken = ctx.request.header[expectedHeader];
  if (givenToken === expectedValue) {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = { code: ctx.status, data: { error: 'Forbidden' } };
    return ctx.body;
  }
};
