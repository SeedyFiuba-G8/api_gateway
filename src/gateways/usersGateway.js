module.exports = function $usersGateway(gatewayUtils, services) {
  return {
    getIds,
    getNames,
    login
  };

  function getIds(emails) {
    const url = gatewayUtils.urlFactory(
      '/emailtranslation',
      services.users.baseUrl
    );

    return gatewayUtils
      .fetch(url, { method: 'POST', body: emails })
      .then(({ data }) => data);
  }

  function getNames(userIds) {
    const url = gatewayUtils.urlFactory(
      '/idtranslation',
      services.users.baseUrl
    );

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
