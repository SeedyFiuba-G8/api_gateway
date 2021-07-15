module.exports = function $coreGateway(fetch, services, urlFactory) {
  return {
    create,
    get,
    update
  };

  function create(context, projectInfo) {
    const url = urlFactory('/projects', services.core.baseUrl);

    return fetch(url, { method: 'POST', body: projectInfo }, context).then(
      ({ data }) => data.id
    );
  }

  function get(projectId) {
    const url = urlFactory(`/projects/${projectId}`, services.core.baseUrl);

    return fetch(url, { method: 'GET' }).then(({ data }) => data);
  }

  function update(context, projectId, projectInfo) {
    const url = urlFactory(`/projects/${projectId}`, services.core.baseUrl);

    return fetch(url, { method: 'PATCH', body: projectInfo }, context).then(
      ({ data }) => data.id
    );
  }
};
