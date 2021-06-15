module.exports = function projectController(expressify, projectService) {
  return expressify({
    create,
    get,
    getAll,
    modify,
    remove
  });

  async function create(req, res) {
    const projectData = req.body;
    const id = await projectService.create({
      userId: req.context.session.id,
      ...projectData
    });

    return res.status(200).json({ id });
  }

  /**
   * @returns {Promise}
   */
  async function get(req, res) {
    const { projectId } = req.params;
    const project = await projectService.getById(projectId);

    return res.status(200).json(project);
  }

  /**
   * @returns {Promise}
   */
  async function getAll(req, res) {
    const { userId } = req.query;
    let projects;

    if (!userId) {
      projects = await projectService.getAll();
    } else {
      projects = await projectService.getByUserId(userId);
    }

    return res.status(200).json({ projects });
  }

  /**
   * @returns {Promise}
   */
  async function modify(req, res) {
    const { projectId } = req.params;
    const projectData = req.body;
    const id = await projectService.modify(projectId, {
      ...projectData,
      userId: req.context.session.id
    });

    return res.status(200).json({ id });
  }

  /**
   * @returns {Promise}
   */
  async function remove(req, res) {
    const { projectId } = req.params;
    const id = await projectService.remove(projectId, req.context.session.id);

    return res.status(200).json({ id });
  }
};
