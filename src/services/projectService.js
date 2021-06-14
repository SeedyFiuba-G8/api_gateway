module.exports = function projectService(coreGateway) {
  return {
    create,
    getById,
    getAll,
    getByUserId,
    modify,
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
  function getByUserId(userId) {
    return coreGateway.getProjectsByUserId(userId);
  }

  /**
   * @returns {Promise}
   */
  function modify(projectId, projectInfo) {
    return coreGateway.modifyProject(projectId, projectInfo);
  }

  /**
   * @returns {Promise}
   */
  function remove(projectId, userId) {
    return coreGateway.removeProject(projectId, userId);
  }
};
