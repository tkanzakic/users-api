import { get } from '.';

const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@gmail.com',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
];
jest.mock('../../model/users', () => ({
  fetch: async () => Promise.resolve(mockUsers),
}));
const mockCalcCrow = jest.fn();
jest.mock('../../utils/distance', () => ({
  calcCrow: () => mockCalcCrow(),
}));

describe('users.get', () => {
  const noop = () => {};
  test('should set status to 200 and return users', async () => {
    const mockCtx = {};
    await get(mockCtx, noop);
    expect(mockCtx.status).toBe(200);
    expect(mockCtx.body.users).toStrictEqual(mockUsers);
  });
  test('should filter users by email if emailContains filter provided', async () => {
    const mockCtx = {
      query: {
        emailContains: 'gmail',
      },
    };
    await get(mockCtx, noop);
    expect(mockCtx.body.users).toStrictEqual([mockUsers[0]]);
  });
  test('should only return requested fields', async () => {
    const mockCtx = {
      query: {
        emailContains: 'gmail',
        fields: ['id', 'name', 'email'],
      },
    };
    await get(mockCtx, noop);
    expect(mockCtx.body.users[0]).toStrictEqual({
      id: mockUsers[0].id,
      name: mockUsers[0].name,
      email: mockUsers[0].email,
    });
  });
  test('should filter by 10 km distance', async () => {
    mockCalcCrow.mockReturnValueOnce(11);
    mockCalcCrow.mockReturnValueOnce(10);
    const mockCtx = {
      query: {
        coordinate: [0, 0],
      },
    };
    await get(mockCtx, noop);
    expect(mockCtx.body.users).toStrictEqual([mockUsers[1]]);
  });
  test('should filter by given distance', async () => {
    mockCalcCrow.mockReturnValueOnce(15);
    mockCalcCrow.mockReturnValueOnce(16);
    const mockCtx = {
      query: {
        coordinate: [0, 0],
        radius: 15,
      },
    };
    await get(mockCtx, noop);
    expect(mockCtx.body.users).toStrictEqual([mockUsers[0]]);
  });
});
