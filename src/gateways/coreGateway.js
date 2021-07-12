module.exports = function $coreGateway(fetch, services, urlFactory) {
  return {
    get
  };

  function get(projectId) {
    const path = `/projects/${projectId}`;
    const url = urlFactory(path, services.core.baseUrl);

    return fetch(url, { method: 'GET' }).then(({ data }) => data);
  }
};
