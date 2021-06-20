module.exports = function projectService(coreGateway) {
  return {
    create,
    getById,
    getBy,
    modify,
    remove
  };

  /**
   * @returns {Promise}
   */
  function create(userId, projectInfo) {
    return coreGateway.createProject(userId, projectInfo);
  }

  /**
   * @returns {Promise}
   */
  function getById(userId, projectId) {
    return coreGateway.getProjectById(userId, projectId);
  }

  /**
   * @returns {Promise}
   */
  function getBy(userId, filters) {
    return coreGateway.getProjectsBy(userId, filters);
  }

  /**
   * @returns {Promise}
   */
  function modify(userId, projectId, projectInfo) {
    return coreGateway.modifyProject(userId, projectId, projectInfo);
  }

  /**
   * @returns {Promise}
   */
  function remove(userId, projectId) {
    return coreGateway.removeProject(userId, projectId);
  }
};
