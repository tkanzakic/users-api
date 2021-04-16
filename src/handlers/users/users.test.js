import { get } from '.';

describe('users.get', () => {
  const mockCtx = {
    request: {
      header: {
        'x-bundle-access-token': 'token',
      },
    },
  };
  const noop = () => {};
  test('should set status to 200', async () => {
    await get(mockCtx, noop);
    expect(mockCtx.status).toBe(200);
    expect(mockCtx.body.users).toBeDefined();
  });
});
