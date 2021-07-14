module.exports = function $coreGateway(gatewayUtils, services) {
  return {
    get
  };

  function get(projectId) {
    const path = `/projects/${projectId}`;
    const url = gatewayUtils.urlFactory(path, services.core.baseUrl);

    return gatewayUtils.fetch(url, { method: 'GET' }).then(({ data }) => data);
  }
};
