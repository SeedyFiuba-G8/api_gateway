module.exports = function $usersGateway(
  apikeys,
  apikeyUtils,
  fetch,
  services,
  urlFactory
) {
  return {
    getIds,
    getNames,
    login
  };

  async function getIds(emails) {
    const url = urlFactory('/emailtranslation', services.users.baseUrl);
    const { users: apikey } = await apikeys;

    return fetch(url, {
      method: 'POST',
      body: emails,
      headers: apikeyUtils.headers(apikey)
    }).then(({ data }) => data);
  }

  async function getNames(userIds) {
    const url = urlFactory('/idtranslation', services.users.baseUrl);
    const { users: apikey } = await apikeys;

    return fetch(url, {
      method: 'POST',
      body: userIds,
      headers: apikeyUtils.headers(apikey)
    }).then(({ data }) => data);
  }

  async function login(credentials, type) {
    const path = type === 'USER' ? '/users/session' : '/admins/session';
    const url = urlFactory(path, services.users.baseUrl);
    const { users: apikey } = await apikeys;

    return fetch(url, {
      method: 'POST',
      body: credentials,
      headers: apikeyUtils.headers(apikey)
    }).then(({ data }) => data.id);
  }
};
