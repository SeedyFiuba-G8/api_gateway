const _ = require('lodash');

module.exports = function $projectController(
  apikeys,
  errors,
  expressify,
  innerForward,
  projectService,
  services,
  urlFactory,
  usersGateway
) {
  return expressify({
    create,
    get,
    getAll,
    update
  });

  async function create(req, res) {
    const { context } = req;
    const projectInfo = req.body;
    const id = await projectService.create(context, projectInfo);

    return res.status(200).json({ id });
  }

  async function get(req, res) {
    const { context } = req;
    const { projectId } = req.params;
    const project = await projectService.get(context, projectId);

    return res.status(200).json(project);
  }

  async function getAll(req, res) {
    validateGetAllReq(req);

    const { recommended } = req.query;
    if (recommended === true) return getAllRecommended(req, res);

    const { core: apikey } = await apikeys;
    req.url = urlFactory(
      req.path,
      services.core.baseUrl,
      _.omit(req.query, ['recommended'])
    );

    return innerForward(req, res, apikey);
  }

  async function update(req, res) {
    const { context } = req;
    const { projectId } = req.params;
    const newProjectInfo = req.body;
    const id = await projectService.update(context, projectId, newProjectInfo);

    return res.status(200).json({ id });
  }

  // Aux

  async function getAllRecommended(req, res) {
    const { context } = req;
    const { id: requesterId } = context.session;
    const { core: apikey } = await apikeys;

    const { interests } = await usersGateway.get(requesterId);
    if (interests.length) req.query.interests = interests;
    req.url = urlFactory(req.path, services.core.baseUrl, req.query);

    return innerForward(req, res, apikey);
  }

  function validateGetAllReq(req) {
    const { recommended, lat, long, radius } = req.query;
    if (
      recommended === undefined &&
      lat === undefined &&
      long === undefined &&
      radius === undefined
    )
      return;

    const { context } = req;
    const { type } = context.session;

    if (type !== 'USER')
      throw errors.create(
        400,
        'Only users can use recommended,lat,long,radius query params.'
      );

    if (
      recommended !== undefined &&
      (lat !== undefined || long !== undefined || radius !== undefined)
    )
      throw errors.create(
        'Invalid use of query params: recommended and near params used at the same time!'
      );
  }
};
