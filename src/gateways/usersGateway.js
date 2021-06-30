module.exports = function $usersGateway(fetch, services, urlFactory) {
  return {
    login
  };

  function login(credentials, type) {
    const path = type === 'USER' ? '/users/session' : '/admins/session';
    const url = urlFactory(path, services.users.baseUrl);

    return fetch(url, { method: 'POST', body: credentials }).then(
      ({ data }) => data.id
    );
  }
};
