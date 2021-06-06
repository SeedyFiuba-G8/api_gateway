const express = require('express');

module.exports = function apiRouter(
  apiValidatorMiddleware,
  publicRoutes,
  privateRoutes
) {
  return (
    express
      .Router()
      // Redirect root to api docs
      .get('/', (req, res) => res.redirect('/api-docs'))

      // OpenAPI Validator Middleware
      .use(apiValidatorMiddleware)

      // ROUTES
      .use(publicRoutes)
      .use(privateRoutes)
  );
};
