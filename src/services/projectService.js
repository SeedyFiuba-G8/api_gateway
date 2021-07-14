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

  async function get(projectId) {
    const project = await coreGateway.get(projectId);
    const { reviewers } = project;
    if (!reviewers.length) return project;

    const reviewerIds = reviewers.map((reviewer) => reviewer.reviewerId);
    const names = await usersGateway.getNames(reviewerIds);

    project.reviewers = reviewers.map((reviewer) => {
      const { reviewerId } = reviewer;
      const { email, firstName, lastName } = names[reviewerId];

      return {
        ...reviewer,
        email,
        firstName,
        lastName
      };
    });

    return project;
  }

  async function update(context, projectId, newProjectInfo) {
    const parsedProjectInfo = await buildProjectInfo(context, newProjectInfo);
    return coreGateway.update(context, projectId, parsedProjectInfo);
  }

  // Aux

  async function buildProjectInfo(context, projectInfo) {
    const { reviewers: reviewerEmails } = projectInfo;
    if (!reviewerEmails.length) return projectInfo;

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
