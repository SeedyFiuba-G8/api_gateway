module.exports = function $baseNocks(axiosMock, services, urlFactory) {
  const nocks = {
    users: { ...buildNocks(services.users.baseUrl) },
    core: { ...buildNocks(services.core.baseUrl) },
    sc: { ...buildNocks(services.sc.baseUrl) },
    apikeys: { ...buildNocks(services.apikeys.baseUrl) }
  };

  function buildNocks(baseUrl) {
    return {
      get: nockGet(baseUrl),
      post: nockPost(baseUrl),
      patch: nockPatch(baseUrl),
      put: nockPut(baseUrl),
      delete: nockDelete(baseUrl)
    };
  }

  function nockGet(base) {
    return ({ path, params, header }, reply) => {
      const url = urlFactory(path, base);
      axiosMock.onGet(url, params, header).reply(reply);
    };
  }

  function nockPost(base) {
    return ({ path, params, header }, reply) => {
      const url = urlFactory(path, base);
      axiosMock.onPost(url, params, header).reply(reply);
    };
  }

  function nockPut(base) {
    return ({ path, params, header }, reply) => {
      const url = urlFactory(path, base);
      axiosMock.onPut(url, params, header).reply(reply);
    };
  }

  function nockPatch(base) {
    return ({ path, params, header }, reply) => {
      const url = urlFactory(path, base);
      axiosMock.onPatch(url, params, header).reply(reply);
    };
  }

  function nockDelete(base) {
    return ({ path, params, header }, reply) => {
      const url = urlFactory(path, base);
      axiosMock.onDelete(url, params, header).reply(reply);
    };
  }

  return nocks;
};
