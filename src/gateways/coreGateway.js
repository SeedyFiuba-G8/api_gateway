module.exports = function $coreGateway(
  apikeys,
  apikeyUtils,
  fetch,
  services,
  urlFactory
) {
  return {
    create,
    get,
    update
  };

  async function create(context, projectInfo) {
    const url = urlFactory('/projects', services.core.baseUrl);
    const { core: apikey } = await apikeys;

    return fetch(
      url,
      {
        method: 'POST',
        body: projectInfo,
        headers: apikeyUtils.headers(apikey)
      },
      context
    ).then(({ data }) => data.id);
  }

  async function get(projectId) {
    const url = urlFactory(`/projects/${projectId}`, services.core.baseUrl);
    const { core: apikey } = await apikeys;

    return fetch(url, {
      method: 'GET',
      headers: apikeyUtils.headers(apikey)
    }).then(({ data }) => data);
  }

  async function update(context, projectId, projectInfo) {
    const url = urlFactory(`/projects/${projectId}`, services.core.baseUrl);
    const { core: apikey } = await apikeys;

    return fetch(
      url,
      {
        method: 'PATCH',
        body: projectInfo,
        headers: apikeyUtils.headers(apikey)
      },
      context
    ).then(({ data }) => data.id);
  }
};
