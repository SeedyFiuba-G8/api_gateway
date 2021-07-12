module.exports = function $projectController(projectService, expressify) {
  return expressify({
    get
  });

  async function get(req, res) {
    const { projectId } = req.params;
    const project = await projectService.get(projectId);

    return res.status(200).json(project);
  }
};
