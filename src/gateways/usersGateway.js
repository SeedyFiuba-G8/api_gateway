const axios = require('axios');

module.exports = function usersGateway(config, logger, services, urlFactory) {
  return {
    register,

    // Status
    health,
    ping
  };

  /**
   * Forwards register request
   *
   * @returns {Promise}
   */
  async function register(userData) {
    const url = urlFactory('/user', services.users);
    return axios(url, { method: 'POST' });
  }

  /**
   * Fetch for users microservice health
   *
   * @returns {Promise}
   */
  async function health() {
    const url = urlFactory('/health', services.users);
    let response;

    try {
      response = await axios(url, {
        method: 'GET',
        timeout: config.timeouts.health
      });
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        return 'timed out';
      }
      throw err;
    }

    return response.status === 200 ? response.data : 'bad status';
  }

  /**
   * Fetch for users microservice status
   *
   * @returns {Promise}
   */
  async function ping() {
    const url = urlFactory('/ping', services.users);
    let response;

    try {
      response = await axios(url, {
        method: 'GET',
        timeout: config.timeouts.ping
      });
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        return 'timed out';
      }
      throw err;
    }

    return response.status === 200 ? 'ok' : 'bad status';
  }
};
