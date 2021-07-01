const express = require('express');

module.exports = function $forwardCoreRouter(
  authMiddleware,
  forwardingController
) {
  const controller = forwardingController.core;

  return (
    express
      .Router()

      // PROJECTS

      // Common middleware
      .use('/projects', authMiddleware)

      .get('/projects', controller)
      .post('/projects', controller)
      .get('/projects/:projectId', controller)
      .patch('/projects/:projectId', controller)
      .delete('/projects/:projectId', controller)
  );
};
