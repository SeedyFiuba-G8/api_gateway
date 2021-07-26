const express = require('express');

module.exports = function $apiRouter(
  apiValidatorMiddleware,
  authMiddleware,
  forwardingController,
  metricController,
  projectController,
  sessionController,
  sessionMiddleware,
  statusController,
  userController
) {
  // Forwarding controllers
  const forward2core = forwardingController.core;
  const forward2users = forwardingController.users;

  // Permissions
  const onlyAdmins = authMiddleware.admin;
  const onlyUsers = authMiddleware.user;

  return (
    express
      .Router()
      // Redirect root to api docs
      .get('/', (req, res) => res.redirect('/api-docs'))

      // COMMON MIDDLEWARE ----------------------------------------------------

      // OpenAPI Validator Middleware
      // (every route defined after this point needs to be API-defined)
      .use(apiValidatorMiddleware)

      // STATUS ---------------------------------------------------------------

      .get('/health', statusController.health)
      .get('/ping', statusController.ping)
      .get('/pingAll', statusController.pingAll)

      // USERS ----------------------------------------------------------------

      .get('/users', sessionMiddleware, onlyAdmins, forward2users)
      .post('/users', userController.create)
      .post('/users/session', sessionController.loginUser)
      .get('/users/:userId', sessionMiddleware, userController.get)
      .patch('/users/:userId', sessionMiddleware, onlyUsers, forward2users)

      // ADMINS ---------------------------------------------------------------

      .post('/admins', sessionMiddleware, onlyAdmins, forward2users)
      .post('/admins/session', sessionController.loginAdmin)

      // PROJECTS -------------------------------------------------------------
      .use('/projects', sessionMiddleware)

      .get('/projects', forward2core)
      .post('/projects', onlyUsers, projectController.create)
      .get('/projects/:projectId', projectController.get)
      .delete('/projects/:projectId', forward2core)
      .patch('/projects/:projectId', projectController.update)
      .post('/projects/:projectId/funds', forward2core)

      // REVIEWERS ------------------------------------------------------------
      .use('/reviewrequests', sessionMiddleware)

      .get('/reviewrequests/:reviewerId', forward2core)
      .put('/reviewrequests/:reviewerId/:projectId', forward2core)

      // METRICS --------------------------------------------------------------
      .use('/metrics', sessionMiddleware)
      .use('/metrics', onlyAdmins)

      .get('/metrics/users', metricController.getAccountBasic)
      .get('/metrics/projects', metricController.getProjectBasic)
      .get('/metrics/events/users', metricController.getAccountEvents)
      .get('/metrics/events/projects', metricController.getProjectEvents)
  );
};
