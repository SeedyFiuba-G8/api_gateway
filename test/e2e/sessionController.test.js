const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const containerFactory = require('../testContainerFactory');

const container = containerFactory.createContainer();
const fakeUserToken = 'fake-user-token';
const fakeAdminToken = 'fake-admin-token';
const bearerAuthHeader = 'Authorization';
const fakeId = '00000000-feed-0000-0000-c0ffee000000';

describe('sessionController', () => {
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
    spyjwt.verify = jest.spyOn(jwt, 'verify').mockImplementation((token) => {
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

  describe('/users/session', () => {
    const path = '/users/session';

    describe('POST', () => {
      beforeEach(() => {
        baseNocks.users.post({ path }, async (config) => {
          const data = JSON.parse(config.data);
          if (
            (data.email === 'test@test.com' &&
              data.password === 'testpasswd') ||
            data.fbToken
          ) {
            return [200, { id: fakeId }];
          }
          return [404];
        });
        baseNocks.core.post(
          { path: '/users/00000000-feed-0000-0000-c0ffee000000/pushToken' },
          () => [200, '00000000-feed-0000-0000-c0ffee000000']
        );
        baseNocks.core.post({ path: '/wallets' }, () => [
          200,
          { uid: 'c0ffee00-0000-0000-0000-000000000000' }
        ]);
        baseNocks.core.get({
          path: '/wallets/00000000-feed-0000-0000-c0ffee000000'
        });
      });

      describe('when an invalid user/admin posts a new session', () => {
        it('should return code 404', async () => {
          await request
            .post(path)
            .send({ email: 'not@registered', password: 'wrong' })
            .expect(404);
        });
      });

      describe('when a valid user posts a new session', () => {
        it('should return code 200 and the correct body', async () => {
          const responseBody = {
            id: fakeId,
            token: fakeUserToken
          };

          await request
            .post(path)
            .send({ email: 'test@test.com', password: 'testpasswd' })
            .expect('Content-Type', /json/)
            .expect(200, responseBody);
        });
      });

      describe('when a valid user posts with the optional expo-token', () => {
        it('should return code 200 and body containing a token', async () => {
          const responseBody = {
            id: fakeId,
            token: fakeUserToken
          };

          await request
            .post(path)
            .send({
              email: 'test@test.com',
              password: 'testpasswd',
              expoToken: 'an-expo-token'
            })
            .expect('Content-Type', /json/)
            .expect(200, responseBody);
        });
      });

      describe('when an user wants to login with FB', () => {
        it('should return with 200 status code, a valid id and token', async () => {
          const responseBody = {
            id: fakeId,
            token: fakeUserToken
          };
          await request
            .post(path)
            .send({ fbToken: 'a-very-secret-fb-token' })
            .expect(200, responseBody);
        });
      });
    });

    describe('DELETE', () => {
      beforeEach(() => {
        baseNocks.users.delete({ path }, async () => [200, { id: fakeId }]);
      });

      describe('when a valid user logs out', () => {
        it('should return with code 200 and empty body', async () => {
          await request
            .delete(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .send({'expo-token': 'ExponentPushToken[a-token]'})
            .expect(200);
        });
      });
    });
  });

  describe('/admins/session', () => {
    const path = '/admins/session';

    describe('when a valid admin wants to post a session', () => {
      beforeEach(() => {
        baseNocks.users.post({ path }, () => [200, { id: fakeId }]);
      });
      it('should create it successfully and return 200 with the token', async () => {
        const responseBody = {
          id: fakeId,
          token: fakeAdminToken
        };
        await request
          .post(path)
          .send({ email: 'test@test.com', password: 'testpasswd' })
          .expect(200, responseBody);
      });
    });
  });
});
