const axios = require('axios');

module.exports = function coreGateway(config, errors, services, urlFactory) {
  return {
    createProject,
    getAllProjects,

    // Status
    health,
    ping
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
