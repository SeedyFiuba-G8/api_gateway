module.exports = function $projectController(projectService, expressify) {
  return expressify({
    create,
    get,
    update
  });

  async function create(req, res) {
    const { context } = req;
    const projectInfo = req.body;
    const id = await projectService.create(context, projectInfo);

    return res.status(200).json({ id });
  }

  async function get(req, res) {
    const { projectId } = req.params;
    const project = await projectService.get(projectId);

    return res.status(200).json(project);
  }

  async function update(req, res) {
    const { context } = req;
    const { projectId } = req.params;
    const newProjectInfo = req.body;
    const id = await projectService.update(context, projectId, newProjectInfo);

    return res.status(200).json({ id });
  }
};
