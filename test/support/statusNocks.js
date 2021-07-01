module.exports = function $statusNocks(axiosMock, urlFactory, services) {
  return { nockCoreHealth, nockCorePing, nockUsersHealth, nockUsersPing };

  function nockCoreHealth(statusCode) {
    nockHealth(services.core.baseUrl, { statusCode });
  }

  function nockCorePing(statusCode) {
    nockPing(services.core.baseUrl, { statusCode });
  }

  function nockUsersHealth(statusCode) {
    nockHealth(services.users.baseUrl, { statusCode });
  }

  function nockUsersPing(statusCode) {
    nockPing(services.users.baseUrl, { statusCode });
  }

  // Private

  function nockHealth(
    baseUrl,
    { statusCode = 200, data = { database: 'UP' } } = {}
  ) {
    const url = urlFactory('/health', baseUrl);

    axiosMock.onGet(url).reply(statusCode, data);
  }

  function nockPing(
    baseUrl,
    { statusCode = 200, data = { status: 'ok' } } = {}
  ) {
    const url = urlFactory('/ping', baseUrl);

    axiosMock.onGet(url).reply(statusCode, data);
  }
};
