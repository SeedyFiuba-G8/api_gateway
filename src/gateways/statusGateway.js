module.exports = function $statusGateway(gatewayUtils) {
  return {
    ping,
    health
  };

  function health(baseUrl) {
    const url = gatewayUtils.urlFactory('/health', baseUrl);

    return gatewayUtils
      .fetch(url)
      .then(({ data }) => data)
      .catch((err) => {
        if (err.status === 504) {
          return 'timed out';
        }

        return 'bad status';
      });
  }

  function ping(baseUrl) {
    const url = gatewayUtils.urlFactory('/ping', baseUrl);

    return gatewayUtils
      .fetch(url)
      .then(() => 'ok')
      .catch((err) => {
        if (err.status === 504) {
          return 'timed out';
        }

        return 'bad status';
      });
  }
};
