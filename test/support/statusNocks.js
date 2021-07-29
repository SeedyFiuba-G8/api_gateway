module.exports = function $statusNocks(axiosMock, services, urlFactory) {
  return {
    // API KEYS
    nockApiKeysHealth: (statusCode) =>
      nockHealth(services.apikeys.baseUrl, { statusCode }),
    nockApiKeysInfo: (statusCode) =>
      nockInfo(services.apikeys.baseUrl, { statusCode }),
    nockApiKeysPing: (statusCode) =>
      nockPing(services.apikeys.baseUrl, { statusCode }),
    nockApiKeysTimeout: (path) =>
      nockGetTimeout(path, services.apikeys.baseUrl),

    // CORE
    nockCoreHealth: (statusCode) =>
      nockHealth(services.core.baseUrl, { statusCode }),
    nockCoreInfo: (statusCode) =>
      nockInfo(services.core.baseUrl, { statusCode }),
    nockCorePing: (statusCode) =>
      nockPing(services.core.baseUrl, { statusCode }),
    nockCoreTimeout: (path) => nockGetTimeout(path, services.core.baseUrl),

    // SC
    nockSCHealth: (statusCode) =>
      nockHealth(services.sc.baseUrl, { statusCode }),
    nockSCInfo: (statusCode) =>
      nockInfo(services.sc.baseUrl, { statusCode }),
    nockSCPing: (statusCode) => nockPing(services.sc.baseUrl, { statusCode }),
    nockSCTimeout: (path) => nockGetTimeout(path, services.sc.baseUrl),

    // USERS
    nockUsersHealth: (statusCode) =>
      nockHealth(services.users.baseUrl, { statusCode }),
    nockUsersInfo: (statusCode) =>
      nockInfo(services.users.baseUrl, { statusCode }),
    nockUsersPing: (statusCode) =>
      nockPing(services.users.baseUrl, { statusCode }),
    nockUsersTimeout: (path) => nockGetTimeout(path, services.users.baseUrl)
  };

  // Aux
  function nockHealth(
    baseUrl,
    { statusCode = 200, data = { database: 'UP' } } = {}
  ) {
    return nockGet('/health', baseUrl, { statusCode, data });
  }

  function nockInfo(
    baseUrl,
    {
      statusCode = 200,
      data = {
        creationDate: '2021-06-01T01:00:00.000Z',
        description: 'Microservice description.'
      }
    }
  ) {
    return nockGet('/info', baseUrl, { statusCode, data });
  }

  function nockPing(
    baseUrl,
    { statusCode = 200, data = { database: 'ok' } } = {}
  ) {
    return nockGet('/ping', baseUrl, { statusCode, data });
  }

  function nockGetTimeout(path, baseUrl) {
    const url = urlFactory(path, baseUrl);
    axiosMock.onGet(url).timeout();
  }

  function nockGet(path, baseUrl, { statusCode, data } = {}) {
    const url = urlFactory(path, baseUrl);
    axiosMock.onGet(url).reply(statusCode, data);
  }
};
