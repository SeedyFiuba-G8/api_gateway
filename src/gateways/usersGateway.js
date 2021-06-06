const axios = require('axios');

module.exports = function usersGateway(config, logger, services, urlFactory) {
  return {
    health,
    ping
  };

  /**
   * Fetch for users microservice health
   *
   * @returns {Promise}
   */
  async function health() {
    const url = urlFactory('/health', services.users);
    return axios(url, { method: 'get', timeout: config.timeouts.health })
      .then(({ status, data }) => {
        if (status === 200) {
          return data;
        }
        return 'bad status';
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }
        throw err;
      });
  }

  /**
   * Fetch for users microservice status
   *
   * @returns {Promise}
   */
  async function ping() {
    const url = urlFactory('/ping', services.users);
    return axios(url, { method: 'get', timeout: config.timeouts.ping })
      .then(({ status }) => {
        if (status === 200) {
          return 'ok';
        }
        return 'bad status';
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }
        throw err;
      });
  }
};
