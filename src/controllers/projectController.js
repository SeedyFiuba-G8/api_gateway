module.exports = function projectController(projectService) {
  return {
    create,
    getAll
  };

  /**
   * @returns {Promise}
   */
  async function create(req, res, next) {
    const projectData = req.body;
    let response;

    try {
      response = await projectService.create(projectData);
    } catch (err) {
      return next(err);
    }

    console.log('RESPONSE: ', response);

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
};
