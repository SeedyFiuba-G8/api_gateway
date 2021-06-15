const axios = require('axios');

module.exports = function coreGateway(config, errors, services, urlFactory) {
  return {
    createProject,
    getAllProjects,
    getProjectById,
    getProjectsByUserId,
    health,
    modifyProject,
    ping,
    removeProject
  };

  /**
   * @returns {Promise}
   */
  function createProject(projectInfo) {
    const url = urlFactory('/project', services.core);

    return axios
      .post(url, projectInfo, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.data.id)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function getAllProjects() {
    const url = urlFactory('/project', services.core);

    return axios
      .get(url, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.data.projects)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function getProjectsByUserId(userId) {
    const url = urlFactory(`/project?userId=${userId}`, services.core);

    return axios
      .get(url, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.data.projects)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function getProjectById(projectId) {
    const url = urlFactory(`/project/${projectId}`, services.core);

    return axios
      .get(url, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.data)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function modifyProject(projectId, projectInfo) {
    const url = urlFactory(`/project/${projectId}`, services.core);

    return axios
      .put(url, projectInfo, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.data.id)
      .catch((err) => Promise.reject(errors.FromAxios(err)));
  }

  /**
   * @returns {Promise}
   */
  function removeProject(projectId, userId) {
    const url = urlFactory(`/project/${projectId}`, services.core);

    return axios
      .delete(
        url,
        { userId },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
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
      .then((res) => (res.status === 200 ? res.data : 'bad status'))
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }
        return Promise.reject(errors.FromAxios(err));
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
      .then((res) => (res.status === 200 ? 'ok' : 'bad status'))
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          return 'timed out';
        }
        return Promise.reject(errors.FromAxios(err));
      });
  }
};
