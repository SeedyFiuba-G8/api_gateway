const axios = require('axios');

module.exports = function coreGateway(config, errors, services, urlFactory) {
  return {
    createProject,
    getProjectById,
    getProjectsBy,
    health,
    modifyProject,
    ping,
    removeProject
  };

  /**
   * @returns {Promise}
   */
  function createProject(userId, projectInfo) {
    const url = urlFactory('/projects', services.core);

    return axios
      .post(url, projectInfo, {
        headers: { 'Content-Type': 'application/json', uid: userId }
      })
      .then((res) => res.data.id)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function getProjectsBy(userId, filters) {
    const url = urlFactory(`/projects`, services.core, filters);

    return axios
      .get(url, {
        headers: { 'Content-Type': 'application/json', uid: userId }
      })
      .then((res) => res.data.projects)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function getProjectById(userId, projectId) {
    const url = urlFactory(`/projects/${projectId}`, services.core);

    return axios
      .get(url, {
        headers: { 'Content-Type': 'application/json', uid: userId }
      })
      .then((res) => res.data)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function modifyProject(userId, projectId, projectInfo) {
    const url = urlFactory(`/projects/${projectId}`, services.core);

    return axios
      .put(url, projectInfo, {
        headers: { 'Content-Type': 'application/json', uid: userId }
      })
      .then((res) => res.data.id)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function removeProject(userId, projectId) {
    const url = urlFactory(`/projects/${projectId}`, services.core);

    return axios
      .delete(url, {
        headers: { 'Content-Type': 'application/json', uid: userId }
      })
      .then((res) => res.data.id)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function health() {
    const url = urlFactory('/health', services.core);

    return axios(url, {
      method: 'GET',
      timeout: config.timeouts.health
    })
      .then((res) => res.data)
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }

        return 'bad status';
      });
  }

  /**
   * @returns {Promise}
   */
  function ping() {
    const url = urlFactory('/ping', services.core);

    return axios(url, {
      method: 'GET',
      timeout: config.timeouts.ping
    })
      .then(() => 'ok')
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }

        return 'bad status';
      });
  }
};
