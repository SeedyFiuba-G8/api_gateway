module.exports = function projectController(projectService) {
  return {
    create,
    get,
    getAll,
    remove
  };

  /**
   * @returns {Promise}
   */
  async function create(req, res, next) {
    const projectData = req.body;
    let response;

    try {
      response = await projectService.create({
        userId: req.context.session.id,
        ...projectData
      });
    } catch (err) {
      return next(err);
    }

    return res.status(response.status).send(response.data);
  }

  /**
   * @returns {Promise}
   */
  async function get(req, res, next) {
    const { projectId } = req.params;
    let response;

    try {
      response = await projectService.getById(projectId);
    } catch (err) {
      return next(err);
    }

    return res.status(response.status).send(response.data);
  }

  /**
   * @returns {Promise}
   */
  async function getAll(req, res, next) {
    let response;

    try {
      response = await projectService.getAll();
    } catch (err) {
      return next(err);
    }

    return res.status(response.status).send(response.data);
  }

  /**
   * @returns {Promise}
   */
  async function remove(req, res, next) {
    const { projectId } = req.params;
    let response;

    try {
      response = await projectService.remove({
        userId: req.context.session.id,
        projectId
      });
    } catch (err) {
      return next(err);
    }

    return res.status(response.status).send(response.data);
  }
};
