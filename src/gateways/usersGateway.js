const axios = require('axios');

module.exports = function usersGateway(config, logger, services, urlFactory) {
  /**
   * Fetch for users microservice health
   *
   * @returns {Promise}
   */
  async function health() {
    const url = urlFactory('/health', services.users);
    const { data } = await axios(url, { method: 'get' });

    return data;
  }

  /**
   * Fetch for users microservice status
   *
   * @returns {Promise}
   */
  async function ping() {
    const url = urlFactory('/ping', services.users);
    return axios(url, { method: 'get', timeout: config.timeouts.ping })
      .then(({ status }) => status === 200)
      .catch(() => false);
  }

  return {
    health,
    ping
  };
};
