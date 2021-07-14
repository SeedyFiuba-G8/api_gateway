module.exports = function $coreGateway(gatewayUtils, services) {
  return {
    create,
    get,
    update
  };

  function create(context, projectInfo) {
    const url = gatewayUtils.urlFactory('/projects', services.core.baseUrl);

    return gatewayUtils
      .fetch(url, { method: 'POST', body: projectInfo }, context)
      .then(({ data }) => data.id);
  }

  function get(projectId) {
    const url = gatewayUtils.urlFactory(
      `/projects/${projectId}`,
      services.core.baseUrl
    );

    return gatewayUtils.fetch(url, { method: 'GET' }).then(({ data }) => data);
  }

  function update(context, projectId, projectInfo) {
    const url = gatewayUtils.urlFactory(
      `/projects/${projectId}`,
      services.core.baseUrl
    );

    return gatewayUtils
      .fetch(url, { method: 'PATCH', body: projectInfo }, context)
      .then(({ data }) => data.id);
  }
};
