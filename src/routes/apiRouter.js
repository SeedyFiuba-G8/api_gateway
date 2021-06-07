const express = require('express');

module.exports = function apiRouter(
  apiValidatorMiddleware,
  usersController,
  statusController
) {
  return (
    express
      .Router()
      // Redirect root to api docs
      .get('/', (req, res) => res.redirect('/api-docs'))

      // OpenAPI Validator Middleware
      .use(apiValidatorMiddleware)

      // STATUS
      .get('/ping', statusController.ping)
      .get('/ping/all', statusController.pingAll)
      .get('/health', statusController.health)

      // USERS
      .post('/user', usersController.register)
      .post('/user/session', usersController.login)
  );
};
