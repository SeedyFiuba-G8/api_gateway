module.exports = function $statusNocks(axiosMock, services, urlFactory) {
  return {
    nockCoreHealth,
    nockCorePing,
    nockCoreTimeout,
    nockUsersHealth,
    nockUsersPing,
    nockUsersTimeout
  };

  function nockCoreHealth(statusCode) {
    nockHealth(services.core.baseUrl, { statusCode });
  }

  function nockCorePing(statusCode) {
    nockPing(services.core.baseUrl, { statusCode });
  }

  function nockCoreTimeout(path) {
    nockGetTimeout(path, services.core.baseUrl);
  }

  function nockUsersHealth(statusCode) {
    nockHealth(services.users.baseUrl, { statusCode });
  }

  function nockUsersPing(statusCode) {
    nockPing(services.users.baseUrl, { statusCode });
  }

  function nockUsersTimeout(path) {
    nockGetTimeout(path, services.users.baseUrl);
  }

  // Aux
  function nockHealth(
    baseUrl,
    { statusCode = 200, data = { database: 'UP' } } = {}
  ) {
    return nockGet('/health', baseUrl, { statusCode, data });
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
