const supertest = require('supertest');
const containerFactory = require('../testContainerFactory');

const container = containerFactory.createContainer();

describe('statusController', () => {
  let coreGateway;
  let coreNocks;
  let request;
  let usersGateway;
  let usersNocks;

  beforeEach(() => {
    coreGateway = container.get('coreGateway');
    coreNocks = container.get('coreNocks');
    request = supertest(container.get('app'));
    usersGateway = container.get('usersGateway');
    usersNocks = container.get('usersNocks');
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

        coreNocks.nockHealth();
        usersNocks.nockHealth();
      });

      describe('when apikeys is down', () => {
        describe('when apikeys times out', () => {});

        describe('when apikeys returns bad status', () => {});
      });

      describe('when core is down', () => {
        describe('when core times out', () => {
          beforeEach(() => {
            response.services.core = 'timed out';
            jest.spyOn(coreGateway, 'health').mockReturnValueOnce('timed out');
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
            coreNocks.nockHealth(500);
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
            jest.spyOn(usersGateway, 'health').mockReturnValueOnce('timed out');
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
            usersNocks.nockHealth(500);
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

        coreNocks.nockPing();
        usersNocks.nockPing();
      });

      describe('when apikeys is down', () => {
        describe('when apikeys times out', () => {});

        describe('when apikeys returns bad status', () => {});
      });

      describe('when core is down', () => {
        describe('when core times out', () => {
          beforeEach(() => {
            response.services.core = 'timed out';
            jest.spyOn(coreGateway, 'ping').mockReturnValueOnce('timed out');
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
            coreNocks.nockPing(500);
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
            jest.spyOn(usersGateway, 'ping').mockReturnValueOnce('timed out');
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
            usersNocks.nockPing(500);
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
