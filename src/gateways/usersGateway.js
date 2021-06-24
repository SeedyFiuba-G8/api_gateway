const axios = require('axios');

module.exports = function usersGateway(config, errors, services, urlFactory) {
  return {
    getAllUsers,
    health,
    login,
    ping,
    registerAdmin,
    registerUser
  };

  /**
   * @returns {Promise<undefined>}
   */
  function getAllUsers() {
    const url = urlFactory('/user', services.users, {});
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise<String>}
   */
  function login(credentials, type) {
    const path = type === 'USER' ? '/user/session' : '/admin/session';
    const url = urlFactory(path, services.users, {});

    return axios
      .post(url, credentials, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.data.id)
      .catch((err) => {
        console.log(
          `[TEMP] [usersGateway:login] Fetch to ${url} failed with error:`,
          err
        );
        return Promise.reject(errors.FromAxios(err));
      });
  }

  /**
   * @returns {Promise<undefined>}
   */
  function registerAdmin(adminData) {
    const url = urlFactory('/admin', services.users, {});

    return axios
      .post(url, adminData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch((err) => {
        console.log(
          `[TEMP] [usersGateway:registerAdmin] Fetch to ${url} failed with error:`,
          err
        );
        return Promise.reject(errors.FromAxios(err));
      });
  }

  /**
   * @returns {Promise<undefined>}
   */
  function registerUser(userData) {
    const url = urlFactory('/user', services.users, {});

    return axios
      .post(url, userData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch((err) => {
        console.log(
          `[TEMP] [usersGateway:registerUser] Fetch to ${url} failed with error:`,
          err
        );
        return Promise.reject(errors.FromAxios(err));
      });
  }

  /**
   * @returns {Promise}
   */
  function health() {
    const url = urlFactory('/health', services.users, {});

    return axios(url, {
      method: 'GET',
      timeout: config.timeouts.health
    })
      .then((res) => (res.status === 200 ? res.data : 'bad status'))
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }
        return Promise.reject(errors.FromAxios(err));
      });
  }

  /**
   * @returns {Promise}
   */
  function ping() {
    const url = urlFactory('/ping', services.users, {});

    return axios(url, {
      method: 'GET',
      timeout: config.timeouts.ping
    })
      .then((res) => (res.status === 200 ? 'ok' : 'bad status'))
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }
        return Promise.reject(errors.FromAxios(err));
      });
  }
};
