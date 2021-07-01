const express = require('express');

module.exports = function $apiRouter(
  apiValidatorMiddleware,
  forwardCoreRouter,
  forwardUsersRouter,
  sessionController,
  statusController
) {
  return (
    express
      .Router()
      // Redirect root to api docs
      .get('/', (req, res) => res.redirect('/api-docs'))

      // OpenAPI Validator Middleware
      // (every route defined after this point needs to be API-defined)
      .use(apiValidatorMiddleware)

      // Forwarded routes
      .use(forwardCoreRouter)
      .use(forwardUsersRouter)

      // SPECIAL TREATMENT ROUTES
      // Routes defined below cannot be directly forwarded either because
      // they need special treatment from gateway, or because they don't
      // map 1:1 to a particular microservice

      // STATUS
      .get('/health', statusController.health)
      .get('/ping', statusController.ping)
      .get('/pingAll', statusController.pingAll)

      // USERS MICROSERVICE
      .post('/users/session', sessionController.loginUser)
      .post('/admins/session', sessionController.loginAdmin)
  );
};
