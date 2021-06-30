module.exports = function $usersNocks(axiosMock, urlFactory, services) {
  return { nockHealth, nockPing };

  function nockHealth(statusCode = 200) {
    const url = urlFactory('/health', services.users);

    axiosMock.onGet(url).reply(statusCode, { database: 'UP' });
  }

  function nockPing(statusCode = 200) {
    const url = urlFactory('/ping', services.users);

    axiosMock.onGet(url).reply(statusCode, { status: 'ok' });
  }
};
