const axios = require('axios');

module.exports = function usersGateway(config, errors, services, urlFactory) {
  return {
    login,
    register,

    // Status
    health,
    ping
  };

  /**
   * @returns {undefined}
   */
  async function login(credentials) {
    const url = urlFactory('/user/session', services.users);
    let response;

    try {
      response = await axios.post(url, credentials, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      throw errors.FromAxios(err);
    }

    return response.data.id;
  }

  /**
   * @returns {undefined}
   */
  async function register(userData) {
    const url = urlFactory('/user', services.users);

    try {
      await axios.post(url, userData, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      throw errors.FromAxios(err);
    }
  }

  /**
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
