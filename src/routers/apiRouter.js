const express = require('express');

module.exports = function $apiRouter(
  apiValidatorMiddleware,
  authMiddleware,
  forwardingController,
  sessionController,
  sessionMiddleware,
  statusController
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
      .post('/users', forward2users)
      .post('/users/session', sessionController.loginUser)
      .get('/users/:userId', forward2users)

      // ADMINS ---------------------------------------------------------------

      .post('/admins', sessionMiddleware, onlyAdmins, forward2users)
      .post('/admins/session', sessionController.loginAdmin)

      // PROJECTS -------------------------------------------------------------
      .use('/projects', sessionMiddleware)

      .get('/projects', forward2core)
      .post('/projects', onlyUsers, forward2core)
      .get('/projects/:projectId', forward2core)
      .delete('/projects/:projectId', forward2core)
      .patch('/projects/:projectId', forward2core)
  );
};
