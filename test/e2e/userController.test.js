const _ = require('lodash');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const containerFactory = require('../testContainerFactory');

const container = containerFactory.createContainer();
const fakeUserToken = 'fake-user-token';
const fakeAdminToken = 'fake-admin-token';
const bearerAuthHeader = 'Authorization';
const fakeId = '00000000-feed-0000-0000-c0ffee000000';

describe('userController', () => {
  let request;
  let spyjwt;
  let axiosMock;
  let baseNocks;

  beforeEach(() => {
    spyjwt = {};
    request = supertest(container.get('app'));
    axiosMock = container.get('axiosMock');
    baseNocks = container.get('baseNocks');

    spyjwt.sign = jest.spyOn(jwt, 'sign').mockImplementation(({ type }) => {
      if (type === 'USER') return fakeUserToken;
      return fakeAdminToken;
    });
    spyjwt.verify = jest
      .spyOn(jwt, 'verify')
      .mockImplementation(async (token) => {
        switch (token) {
          case fakeUserToken: {
            return { id: fakeId, type: 'USER' };
          }
          case fakeAdminToken: {
            return { id: fakeId, type: 'ADMIN' };
          }
          default:
            throw Error({ name: 'JsonWebTokenError' });
        }
      });
  });

  afterEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
  });

  describe('/users', () => {
    const path = '/users';
    const userInfo = {
      email: 'test@test.com',
      password: 'testpasswd',
      firstName: 'Test',
      lastName: 'User'
    };

    beforeEach(() => {
      baseNocks.users.post({ path }, () => [
        201,
        { id: fakeId, ..._.omit(userInfo, ['password']) }
      ]);
      baseNocks.core.post({ path: '/wallets', params: { uid: fakeId } }, () => [
        201,
        '0xf018Be4Fe4fBD4cA1B1162A44bB139a343C2087b'
      ]);
    });

    describe('POST', () => {
      describe('when a new user wants to be registered', () => {
        it('should return success code 200 and their information', () =>
          request.post(path).send(userInfo).expect(201, { id: fakeId }));
      });
    });
  });

  describe('/users/:userId', () => {
    const path = `/users/${fakeId}`;
    const userInfo = {
      firstName: 'Memis',
      lastName: 'Pomofot',
      banned: false,
      signupDate: '2021-06-13T21:29:29.330Z',
      city: 'Buenos Aires',
      country: 'Argentina',
      interests: ['music', 'entertainment', 'productivity']
    };
    const fullUserInfo = {
      firstName: 'Memis',
      lastName: 'Pomofot',
      banned: false,
      signupDate: '2021-06-13T21:29:29.330Z',
      city: 'Buenos Aires',
      country: 'Argentina',
      interests: ['music', 'entertainment', 'productivity'],
      address: '0xf018Be4Fe4fBD4cA1B1162A44bB139a343C2087b',
      balance: 0.000001
    };

    beforeEach(() => {
      baseNocks.users.get({ path }, () => [200, userInfo]);
      baseNocks.core.get({ path: `/wallets/${fakeId}` }, () => [
        200,
        {
          address: '0xf018Be4Fe4fBD4cA1B1162A44bB139a343C2087b',
          balance: 0.000001
        }
      ]);
    });

    describe('GET', () => {
      describe('when a user wants to get another´s profile', () => {
        it('should return success code 200 and their information', () =>
          request
            .get(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .expect(200, fullUserInfo));
      });
    });
  });

  describe('/users/:userId/message', () => {
    const path = `/users/${fakeId}/message`;
    const userInfo = {
      email: 'test@test.com',
      password: 'testpasswd',
      firstName: 'Test',
      lastName: 'User'
    };

    beforeEach(() => {
      baseNocks.users.get({ path: `/users/${fakeId}` }, () => [200, userInfo]);
      baseNocks.core.post({ path }, () => [200, fakeId]);
    });

    describe('POST', () => {
      describe('when a user wants to send a push message notification to another', () => {
        it('should return with code 200 and the receivers id', () =>
          request
            .post(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .send({ message: 'This is an example message.' })
            .expect(200, `"${fakeId}"`));
      });
    });
  });
});
