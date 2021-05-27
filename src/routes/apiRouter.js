const express = require('express');

module.exports = function apiRouter(apiValidatorMiddleware, statusController) {
  return (
    express
      .Router()
      // Redirect root to api docs
      .get('/', (req, res) => res.redirect('/api-docs'))

      // OpenAPI Validation Middleware
      .use(apiValidatorMiddleware)

      // STATUS ROUTES
      .get('/ping', statusController.ping)

      .get('/ping/all', statusController.pingAll)

      .get('/health', statusController.health)

      // ROUTES
      .get('/mock', (req, res) => res.status(200).send('mock route'))
  );
};
