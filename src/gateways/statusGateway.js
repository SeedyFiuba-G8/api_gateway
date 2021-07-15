module.exports = function $statusGateway(fetch, urlFactory) {
  return {
    ping,
    health
  };

  function health(baseUrl) {
    const url = urlFactory('/health', baseUrl);

    return fetch(url)
      .then(({ data }) => data)
      .catch((err) => {
        if (err.status === 504) {
          return 'timed out';
        }

        return 'bad status';
      });
  }

  function ping(baseUrl) {
    const url = urlFactory('/ping', baseUrl);

    return fetch(url)
      .then(() => 'ok')
      .catch((err) => {
        if (err.status === 504) {
          return 'timed out';
        }

        return 'bad status';
      });
  }
};
