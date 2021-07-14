module.exports = function $coreNocks(axiosMock, gatewayUtils, services) {
  return { nockHealth, nockPing };

  function nockHealth(statusCode = 200) {
    const url = gatewayUtils.urlFactory('/health', services.core.baseUrl);

    axiosMock.onGet(url).reply(statusCode, { database: 'UP' });
  }

  function nockPing(statusCode = 200) {
    const url = gatewayUtils.urlFactory('/ping', services.core.baseUrl);

    axiosMock.onGet(url).reply(statusCode, { status: 'ok' });
  }
};
