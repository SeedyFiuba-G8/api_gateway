module.exports = function projectController(expressify, projectService) {
  return expressify({
    create,
    get,
    getBy,
    modify,
    remove
  });

  async function create(req, res) {
    const projectInfo = req.body;
    const id = await projectService.create(req.context.session.id, projectInfo);

    return res.status(200).json({ id });
  }

  /**
   * @returns {Promise}
   */
  async function get(req, res) {
    const { projectId } = req.params;
    const project = await projectService.getById(
      req.context.session.id,
      projectId
    );

    return res.status(200).json(project);
  }

  /**
   * @returns {Promise}
   */
  async function getBy(req, res) {
    const filters = req.query;

    const projects = await projectService.getBy(
      req.context.session.id,
      filters
    );

    return res.status(200).json({ projects });
  }

  /**
   * @returns {Promise}
   */
  async function modify(req, res) {
    const { projectId } = req.params;
    const projectInfo = req.body;
    const id = await projectService.modify(
      req.context.session.id,
      projectId,
      projectInfo
    );

    return res.status(200).json({ id });
  }

  /**
   * @returns {Promise}
   */
  async function remove(req, res) {
    const { projectId } = req.params;
    const id = await projectService.remove(req.context.session.id, projectId);

    return res.status(200).json({ id });
  }
};
