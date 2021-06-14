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
  async function createProject(projectInfo) {
    const url = urlFactory('/project', services.core);
    let response;

    try {
      response = await axios.post(url, projectInfo, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      throw errors.FromAxios(err);
    }

    return { status: response.status, data: response.data };
  }

  /**
   * @returns {Promise}
   */
  async function getAllProjects() {
    const url = urlFactory('/project', services.core);
    let response;

    try {
      response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      throw errors.FromAxios(err);
    }

    return { status: response.status, data: response.data };
  }

  /**
   * @returns {Promise}
   */
  async function getProjectsByUserId(userId) {
    const url = urlFactory(`/project?userId=${userId}`, services.core);
    let response;

    try {
      response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      throw errors.FromAxios(err);
    }

    return { status: response.status, data: response.data };
  }

  /**
   * @returns {Promise}
   */
  async function getProjectById(projectId) {
    const url = urlFactory(`/project/${projectId}`, services.core);
    let response;

    try {
      response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      throw errors.FromAxios(err);
    }

    return { status: response.status, data: response.data };
  }

  /**
   * @returns {Promise}
   */
  async function modifyProject(projectId, projectInfo) {
    const url = urlFactory(`/project/${projectId}`, services.core);
    let response;

    try {
      response = await axios.put(url, projectInfo, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      throw errors.FromAxios(err);
    }

    return { status: response.status, data: response.data };
  }

  /**
   * @returns {Promise}
   */
  async function removeProject(projectId, userId) {
    const url = urlFactory(`/project/${projectId}`, services.core);
    let response;

    try {
      response = await axios.delete(
        url,
        { userId },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (err) {
      throw errors.FromAxios(err);
    }

    return { status: response.status, data: response.data };
  }

  /**
   * @returns {Promise}
   */
  async function health() {
    const url = urlFactory('/health', services.core);
    let response;

    try {
      response = await axios(url, {
        method: 'GET',
        timeout: config.timeouts.health
      });
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        return 'timed out';
      }
      throw err;
    }

    return response.status === 200 ? response.data : 'bad status';
  }

  /**
   * @returns {Promise}
   */
  async function ping() {
    const url = urlFactory('/ping', services.core);
    let response;

    try {
      response = await axios(url, {
        method: 'GET',
        timeout: config.timeouts.ping
      });
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        return 'timed out';
      }
      throw err;
    }

    return response.status === 200 ? 'ok' : 'bad status';
  }
};
