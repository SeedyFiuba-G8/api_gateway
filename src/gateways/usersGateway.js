module.exports = function $usersGateway(gatewayUtils, services) {
  return {
    getNames,
    login
  };

  function getNames(userIds) {
    const url = gatewayUtils.urlFactory('/names', services.users.baseUrl);

    return gatewayUtils
      .fetch(url, { method: 'POST', body: userIds })
      .then(({ data }) => data);
  }

  function login(credentials, type) {
    const path = type === 'USER' ? '/users/session' : '/admins/session';
    const url = gatewayUtils.urlFactory(path, services.users.baseUrl);

    return gatewayUtils
      .fetch(url, { method: 'POST', body: credentials })
      .then(({ data }) => data.id);
  }
};
