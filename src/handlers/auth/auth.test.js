import { authenticate } from '.';

describe('authenticate', () => {
  describe('non-authenticated request', () => {
    const noop = () => {};
    test('should set context status to forbidden when no authentication', async () => {
      const mockCtx = {
        request: {
          header: {},
        },
      };
      await authenticate(mockCtx, noop);
      expect(mockCtx.status).toBe(403);
      expect(mockCtx.body.code).toBe(403);
      expect(mockCtx.body.message).toBe('Forbidden');
    });
    test('should set context status to forbidden when no authentication', async () => {
      const mockCtx = {
        request: {
          header: {
            'x-bundle-access-token': 'not the expected token',
          },
        },
      };
      await authenticate(mockCtx, noop);
      expect(mockCtx.status).toBe(403);
      expect(mockCtx.body.code).toBe(403);
      expect(mockCtx.body.message).toBe('Forbidden');
    });
  });
  describe('authentication provided', () => {
    const mockNext = jest.fn();
    const mockCtx = {
      request: {
        header: {
          'x-bundle-access-token': 'token',
        },
      },
    };
    test('should call next', async () => {
      await authenticate(mockCtx, mockNext);
      expect(mockNext).toBeCalledTimes(1);
    });
  });
});
