const axios = require('axios');

module.exports = function usersGateway(config, errors, services, urlFactory) {
  return {
    getAllUsers,
    health,
    login,
    ping,
    register
  };

  function getAllUsers() {
    const url = urlFactory('/users', services.users);

    return axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  function login(credentials, type) {
    const path = type === 'USER' ? '/users/session' : '/admins/session';
    const url = urlFactory(path, services.users);

    return axios
      .post(url, credentials, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.data.id)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  function register(registerData, type) {
    const path = type === 'USER' ? '/users' : '/admins';
    const url = urlFactory(path, services.users);

    return axios
      .post(url, registerData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  function health() {
    const url = urlFactory('/health', services.users);

    return axios(url, {
      method: 'GET',
      timeout: config.timeouts.health
    })
      .then((res) => res.data)
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }

        return 'bad status';
      });
  }

  function ping() {
    const url = urlFactory('/ping', services.users);

    return axios(url, {
      method: 'GET',
      timeout: config.timeouts.ping
    })
      .then(() => 'ok')
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }

        return 'bad status';
      });
  }
};
