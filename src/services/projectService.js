module.exports = function projectService(coreGateway) {
  return {
    create,
    getAll
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
};
