const express = require('express');
// const jwt = require('jsonwebtoken');

module.exports = function apiRouter(
  apiValidatorMiddleware,
  authMiddleware,
  config,
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

      // just for testing JWT
      .get('/user/session', authMiddleware, (req, res) =>
        res.json(req.context.session)
      )
  );
};
