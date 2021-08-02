const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const containerFactory = require('../testContainerFactory');

const container = containerFactory.createContainer();
const fakeUserToken = 'fake-user-token';
const fakeAdminToken = 'fake-admin-token';
const bearerAuthHeader = 'Authorization';
const fakeId = '00000000-feed-0000-0000-c0ffee000000';

const usersList = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'example@email.com',
    banned: false,
    firstName: 'Memis',
    lastName: 'Pomofot',
    signupDate: '2021-06-13T21:29:29.330Z'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    email: 'another@email.com',
    banned: true,
    firstName: 'Tai',
    lastName: 'C',
    signupDate: '2021-06-13T21:29:29.330Z'
  }
];

describe('forwardingController', () => {
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
    beforeEach(() => {
      baseNocks.users.get({ path }, () => [200, { users: usersList }]);
    });

    describe('GET', () => {
      describe('when a list of users wants to be retrived by an admin', () => {
        it('should return the complete list', async () => {
          const responseBody = {
            users: usersList
          };
          await request
            .get(path)
            .set(bearerAuthHeader, `Bearer ${fakeAdminToken}`)
            .expect(200, responseBody);
        });
      });
    });
  });

  describe('/users/:userId', () => {
    const path = `/users/${fakeId}`;
    const patchBody = {
      city: 'Buenos Aires',
      country: 'Argentina',
      interests: ['music', 'entertainment', 'productivity']
    };

    beforeEach(() => {
      baseNocks.users.patch({ path, params: patchBody }, () => [200]);
    });

    describe('PATCH', () => {
      describe('when a user wants to apply changes', () => {
        it('should return code 200', () =>
          request
            .patch(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .send(patchBody)
            .expect(200));
      });
    });
  });

  describe('/users/:userId/ban', () => {
    const path = `/users/${fakeId}/ban`;

    beforeEach(() => {
      baseNocks.users.post({ path }, () => [204]);
      baseNocks.users.delete({ path }, () => [204]);
    });

    describe('POST', () => {
      describe('when an admin posts a ban on a user', () => {
        it('should return success 204', () =>
          request
            .post(path)
            .set(bearerAuthHeader, `Bearer ${fakeAdminToken}`)
            .expect(204));
      });
    });

    describe('DELETE', () => {
      describe('when an admin deletes a ban on a user', () => {
        it('should return success 204', () =>
          request
            .delete(path)
            .set(bearerAuthHeader, `Bearer ${fakeAdminToken}`)
            .expect(204));
      });
    });
  });
});

describe('forwardingController.core', () => {
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
  
  describe('/users/:userId/fundings', () => {
    const path = `/users/${fakeId}/fundings`;
    const transactionList = [
      {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        txHash:
          '0x30b003c570eccaf1705acd4621f72993acb51715f8decbf61535f21376cfe1d2',
        projectId: '123e4567-e89b-12d3-a456-426614174000',
        amount: 0.000001,
        date: '2021-06-13T21:29:29.330Z'
      }
    ];

    beforeEach(() => {
      baseNocks.core.get({ path }, () => [200, transactionList]);
    });

    describe('GET', () => {
      describe('when a user wants to get their sent fundings', () => {
        it('should return with status 200 and a list of transactions', () =>
          request
            .get(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .expect(200, transactionList));
      });
    })
    
  });

// '/users/fundings'
// '/projects/:projectId'
// '/projects/:projectId/funds'
// '/projects/:projectId/block'
// '/projects/:projectId/block'
// '/projects/:projectId/like'
// '/projects/:projectId/like'
// '/projects/:projectId/rating'
// '/reviewrequests/:reviewerId'
// '/reviewrequests/:reviewerId/:projectId'
});
