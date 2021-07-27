const _ = require('lodash');

module.exports = function $projectService(coreGateway, errors, usersGateway) {
  return {
    create,
    get,
    update
  };

  async function create(context, projectInfo) {
    const parsedProjectInfo = await buildProjectInfo(context, projectInfo);
    return coreGateway.create(context, parsedProjectInfo);
  }

  async function get(context, projectId) {
    const { type, id: requesterId } = context.session;

    const project = await coreGateway.get(context, projectId);
    const { reviewers, userId } = project;

    if (!reviewers) return project;

    if (requesterId !== userId && type !== 'ADMIN')
      return _.omit(project, ['reviewers']);

    if (!reviewers.length) return project;

    const reviewerIds = reviewers.map((reviewer) => reviewer.reviewerId);
    const names = await usersGateway.getNames(reviewerIds);

    project.reviewers = reviewers.map((reviewer) => {
      const { reviewerId, status } = reviewer;
      const { email, firstName, lastName } = names[reviewerId];

      return {
        email,
        firstName,
        lastName,
        status
      };
    });

    return type === 'ADMIN' ? _.omit(project, ['liked']) : project;
  }

  async function update(context, projectId, newProjectInfo) {
    const parsedProjectInfo = await buildProjectInfo(context, newProjectInfo);
    return coreGateway.update(context, projectId, parsedProjectInfo);
  }

  // Aux

  async function buildProjectInfo(context, projectInfo) {
    const { reviewers: reviewerEmails } = projectInfo;
    if (!reviewerEmails || !reviewerEmails.length) return projectInfo;

    const reviewersById = await usersGateway.getIds(reviewerEmails);
    const requesterId = context.session.id;

    if (_.includes(reviewersById, requesterId))
      throw errors.create(409, 'You cannot review your own project!');

    return {
      ...projectInfo,
      reviewers: reviewersById
    };
  }
};
