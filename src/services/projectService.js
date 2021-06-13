module.exports = function projectService(coreGateway) {
  return {
    create,
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
