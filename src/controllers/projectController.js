module.exports = function projectController(projectService) {
  return {
    create,
    get,
    getAll,
    modify,
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
    const { userId } = req.query;
    const method = userId ? 'getByUserId' : 'getAll';

    try {
      response = await projectService[method](userId);
    } catch (err) {
      return next(err);
    }

    return res.status(response.status).send(response.data);
  }

  /**
   * @returns {Promise}
   */
  async function modify(req, res, next) {
    const { projectId } = req.params;
    const projectData = req.body;
    let response;

    try {
      response = await projectService.modify(projectId, {
        ...projectData,
        userId: req.context.session.id
      });
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
      response = await projectService.remove(projectId, req.context.session.id);
    } catch (err) {
      return next(err);
    }

    return res.status(response.status).send(response.data);
  }
};
