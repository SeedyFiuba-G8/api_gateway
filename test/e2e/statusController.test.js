const supertest = require('supertest');
const containerFactory = require('../testContainerFactory');

const container = containerFactory.createContainer();

describe('statusController', () => {
  let axiosMock;
  let request;
  let statusNocks;
  let nockFuncs;

  const services = ['apikeys', 'core', 'sc', 'users'];
  const expected = {
    apikeys: {
      health: {
        database: 'UP'
      },
      info: {
        creationDate: '2021-06-01T01:00:00.000Z',
        description: 'Microservice description.'
      },
      ping: 'ok'
    },
    core: {
      health: {
        database: 'UP'
      },
      info: {
        creationDate: '2021-06-01T01:00:00.000Z',
        description: 'Microservice description.'
      },
      ping: 'ok'
    },
    sc: {
      health: {
        database: 'UP'
      },
      info: {
        creationDate: '2021-06-01T01:00:00.000Z',
        description: 'Microservice description.'
      },
      ping: 'ok'
    },
    users: {
      health: {
        database: 'UP'
      },
      info: {
        creationDate: '2021-06-01T01:00:00.000Z',
        description: 'Microservice description.'
      },
      ping: 'ok'
    }
  };

  beforeEach(() => {
    axiosMock = container.get('axiosMock');
    request = supertest(container.get('app'));
    statusNocks = container.get('statusNocks');

    nockFuncs = {
      apikeys: {
        health: {
          ok: () => statusNocks.nockApiKeysHealth(),
          badStatus: () => statusNocks.nockApiKeysHealth(500),
          timeout: () => statusNocks.nockApiKeysTimeout('/health')
        },
        info: {
          ok: () => statusNocks.nockApiKeysInfo(),
          badStatus: () => statusNocks.nockApiKeysInfo(500),
          timeout: () => statusNocks.nockApiKeysTimeout('/info')
        },
        ping: {
          ok: () => statusNocks.nockApiKeysPing(),
          badStatus: () => statusNocks.nockApiKeysPing(500),
          timeout: () => statusNocks.nockApiKeysTimeout('/ping')
        }
      },
      core: {
        health: {
          ok: () => statusNocks.nockCoreHealth(),
          badStatus: () => statusNocks.nockCoreHealth(500),
          timeout: () => statusNocks.nockCoreTimeout('/health')
        },
        info: {
          ok: () => statusNocks.nockCoreInfo(),
          badStatus: () => statusNocks.nockCoreInfo(500),
          timeout: () => statusNocks.nockCoreTimeout('/info')
        },
        ping: {
          ok: () => statusNocks.nockCorePing(),
          badStatus: () => statusNocks.nockCorePing(500),
          timeout: () => statusNocks.nockCoreTimeout('/ping')
        }
      },
      sc: {
        health: {
          ok: () => statusNocks.nockSCHealth(),
          badStatus: () => statusNocks.nockSCHealth(500),
          timeout: () => statusNocks.nockSCTimeout('/health')
        },
        info: {
          ok: () => statusNocks.nockSCInfo(),
          badStatus: () => statusNocks.nockSCInfo(500),
          timeout: () => statusNocks.nockSCTimeout('/info')
        },
        ping: {
          ok: () => statusNocks.nockSCPing(),
          badStatus: () => statusNocks.nockSCPing(500),
          timeout: () => statusNocks.nockSCTimeout('/ping')
        }
      },
      users: {
        health: {
          ok: () => statusNocks.nockUsersHealth(),
          badStatus: () => statusNocks.nockUsersHealth(500),
          timeout: () => statusNocks.nockUsersTimeout('/health')
        },
        info: {
          ok: () => statusNocks.nockUsersInfo(),
          badStatus: () => statusNocks.nockUsersInfo(500),
          timeout: () => statusNocks.nockUsersTimeout('/info')
        },
        ping: {
          ok: () => statusNocks.nockUsersPing(),
          badStatus: () => statusNocks.nockUsersPing(500),
          timeout: () => statusNocks.nockUsersTimeout('/ping')
        }
      }
    };
  });

  afterEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
  });

  describe('/health', () => {
    const path = '/health';

    describe('GET', () => {
      let response;

      beforeEach(() => {
        response = {
          status: 'UP',
          services: {}
        };
        services.forEach((service) => {
          response.services[service] = expected[service].health;
          nockFuncs[service].health.ok();
        });
      });

      services.forEach((service) => {
        describe(`when ${service} is down`, () => {
          describe(`when ${service} times out`, () => {
            beforeEach(() => {
              response.services[service] = 'timed out';
              nockFuncs[service].health.timeout();
            });

            it('should respond with correct status and body', () =>
              request
                .get(path)
                .expect('Content-Type', /json/)
                .expect(200, response));
          });

          describe(`when ${service} returns bad status`, () => {
            beforeEach(() => {
              response.services[service] = 'bad status';
              nockFuncs[service].health.badStatus();
            });

            it('should respond with correct status and body', () =>
              request
                .get(path)
                .expect('Content-Type', /json/)
                .expect(200, response));
          });
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

  describe('/info', () => {
    const path = '/info';

    describe('GET', () => {
      let response;

      beforeEach(() => {
        response = {
          apigateway: {
            creationDate: '2021-06-01T01:00:00.000Z',
            description: 'Microservice description.'
          }
        };
        services.forEach((service) => {
          response[service] = expected[service].info;
          nockFuncs[service].info.ok();
        });
      });

      services.forEach((service) => {
        describe(`when ${service} is down`, () => {
          describe(`when ${service} times out`, () => {
            beforeEach(() => {
              response[service] = 'timed out';
              nockFuncs[service].info.timeout();
            });

            it('should respond with correct status and body', () =>
              request
                .get(path)
                .expect('Content-Type', /json/)
                .expect(200, response));
          });

          describe(`when ${service} returns bad status`, () => {
            beforeEach(() => {
              response[service] = 'bad status';
              nockFuncs[service].info.badStatus();
            });

            it('should respond with correct status and body', () =>
              request
                .get(path)
                .expect('Content-Type', /json/)
                .expect(200, response));
          });
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
          services: {}
        };
        services.forEach((service) => {
          response.services[service] = expected[service].ping;
          nockFuncs[service].ping.ok();
        });
      });

      services.forEach((service) => {
        describe(`when ${service} is down`, () => {
          describe(`when ${service} times out`, () => {
            beforeEach(() => {
              response.services[service] = 'timed out';
              nockFuncs[service].ping.timeout();
            });

            it('should respond with correct status and body', () =>
              request
                .get(path)
                .expect('Content-Type', /json/)
                .expect(200, response));
          });

          describe(`when ${service} returns bad status`, () => {
            beforeEach(() => {
              response.services[service] = 'bad status';
              nockFuncs[service].ping.badStatus();
            });

            it('should respond with correct status and body', () =>
              request
                .get(path)
                .expect('Content-Type', /json/)
                .expect(200, response));
          });
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
});
