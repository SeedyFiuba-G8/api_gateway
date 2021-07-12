module.exports = function $usersGateway(fetch, services, urlFactory) {
  return {
    getNames,
    login
  };

  function getNames(userIds) {
    const url = urlFactory('/names', services.users.baseUrl);

    return fetch(url, { method: 'POST', body: userIds }).then(
      ({ data }) => data
    );
  }

  function login(credentials, type) {
    const path = type === 'USER' ? '/users/session' : '/admins/session';
    const url = urlFactory(path, services.users.baseUrl);

    return fetch(url, { method: 'POST', body: credentials }).then(
      ({ data }) => data.id
    );
  }
};
