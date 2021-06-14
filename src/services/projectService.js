module.exports = function projectService(coreGateway) {
  return {
    create,
    getById,
    getAll,
    remove
  };

  /**
   * @returns {Promise}
   */
  function create(projectData) {
    return coreGateway.createProject(projectData);
  }

  /**
   * @returns {Promise}
   */
  function getById(projectId) {
    return coreGateway.getProjectById(projectId);
  }

  /**
   * @returns {Promise}
   */
  function getAll() {
    return coreGateway.getAllProjects();
  }

  /**
   * @returns {Promise}
   */
  function remove(projectId) {
    return coreGateway.removeProject(projectId);
  }
};
