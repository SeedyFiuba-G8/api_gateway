const supertest = require('supertest');
const containerFactory = require('../testContainerFactory');

const container = containerFactory.createContainer();

describe('statusController', () => {
  let request;
  let statusNocks;

  beforeEach(() => {
    request = supertest(container.get('app'));
    statusNocks = container.get('statusNocks');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/health', () => {
    const path = '/health';

    describe('GET', () => {
      let response;

      beforeEach(() => {
        response = {
          status: 'UP',
          services: {
            apikeys: {},
            core: {
              database: 'UP'
            },
            users: {
              database: 'UP'
            }
          }
        };

        statusNocks.nockCoreHealth();
        statusNocks.nockUsersHealth();
      });

      describe('when apikeys is down', () => {
        describe('when apikeys times out', () => {});

        describe('when apikeys returns bad status', () => {});
      });

      describe('when core is down', () => {
        describe('when core times out', () => {
          beforeEach(() => {
            response.services.core = 'timed out';
            statusNocks.nockCoreHealth(504);
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });

        describe('when core returns bad status', () => {
          beforeEach(() => {
            response.services.core = 'bad status';
            statusNocks.nockCoreHealth(500);
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });
      });

      describe('when users is down', () => {
        describe('when users times out', () => {
          beforeEach(() => {
            response.services.users = 'timed out';
            statusNocks.nockUsersHealth(504);
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });

        describe('when users returns bad status', () => {
          beforeEach(() => {
            response.services.users = 'bad status';
            statusNocks.nockUsersHealth(500);
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });
      });

      describe('when all services are UP', () => {
        it('should respond with correct status and body', () =>
          request
            .get(path)
            .expect('Content-Type', /json/)
            .expect(200, response));
      });
    });
  });

  describe('/ping', () => {
    const path = '/ping';

    describe('GET', () => {
      it('should respond with correct status and body', () =>
        request
          .get(path)
          .expect('Content-Type', /json/)
          .expect(200, { status: 'ok' }));
    });
  });

  describe('/pingAll', () => {
    const path = '/pingAll';

    describe('GET', () => {
      let response;

      beforeEach(() => {
        response = {
          status: 'ok',
          services: {
            apikeys: '?',
            core: 'ok',
            users: 'ok'
          }
        };

        statusNocks.nockCorePing();
        statusNocks.nockUsersPing();
      });

      describe('when apikeys is down', () => {
        describe('when apikeys times out', () => {});

        describe('when apikeys returns bad status', () => {});
      });

      describe('when core is down', () => {
        describe('when core times out', () => {
          beforeEach(() => {
            response.services.core = 'timed out';
            statusNocks.nockCorePing(504);
          });

          afterEach(() => {
            jest.clearAllMocks();
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });

        describe('when core returns bad status', () => {
          beforeEach(() => {
            response.services.core = 'bad status';
            statusNocks.nockCorePing(500);
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });
      });

      describe('when users is down', () => {
        describe('when users times out', () => {
          beforeEach(() => {
            response.services.users = 'timed out';
            statusNocks.nockUsersPing(504);
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });

        describe('when users returns bad status', () => {
          beforeEach(() => {
            response.services.users = 'bad status';
            statusNocks.nockUsersPing(500);
          });

          it('should respond with correct status and body', () =>
            request
              .get(path)
              .expect('Content-Type', /json/)
              .expect(200, response));
        });
      });

      describe('when all services are up', () => {
        it('should respond with correct status and body', () =>
          request
            .get(path)
            .expect('Content-Type', /json/)
            .expect(200, response));
      });
    });
  });
});
