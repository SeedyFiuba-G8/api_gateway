module.exports = function $projectService(coreGateway, usersGateway) {
  return {
    get
  };

  async function get(projectId) {
    const project = await coreGateway.get(projectId);
    const { reviewers } = project;
    const reviewerIds = reviewers.map((reviewer) => reviewer.reviewerId);
    const names = await usersGateway.getNames(reviewerIds);

    project.reviewers = reviewers.map((reviewer) => {
      const { reviewerId } = reviewer;
      const { firstName, lastName } = names[reviewerId];

      return {
        ...reviewer,
        firstName,
        lastName
      };
    });

    return project;
  }
};
