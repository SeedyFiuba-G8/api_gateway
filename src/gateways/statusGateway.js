module.exports = function $statusGateway(
  apikeys,
  apikeyUtils,
  fetch,
  urlFactory
) {
  return {
    ping,
    health
  };

  async function health(baseUrl, service) {
    const url = urlFactory('/health', baseUrl);
    const key = (await apikeys)[service];

    return fetch(url, {
      headers: apikeyUtils.headers(key)
    })
      .then(({ data }) => data)
      .catch((err) => {
        if (err.status === 504) {
          return 'timed out';
        }

        return 'bad status';
      });
  }

  async function ping(baseUrl, service) {
    const url = urlFactory('/ping', baseUrl);
    const key = (await apikeys)[service];

    return fetch(url, {
      headers: apikeyUtils.headers(key)
    })
      .then(() => 'ok')
      .catch((err) => {
        if (err.status === 504) {
          return 'timed out';
        }

        return 'bad status';
      });
  }
};
