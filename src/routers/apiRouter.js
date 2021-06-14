const express = require('express');

module.exports = function apiRouter(
  apiValidatorMiddleware,
  authenticationMiddleware,
  usersController,
  projectController,
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
      .get('/pingAll', statusController.pingAll)
      .get('/health', statusController.health)

      // CORE MICROSERVICE

      // Projects
      .get('/project', authenticationMiddleware, projectController.getAll)
      .post('/project', authenticationMiddleware, projectController.create)
      .get(
        '/project/:projectId',
        authenticationMiddleware,
        projectController.get
      )
      .put(
        '/project/:projectId',
        authenticationMiddleware,
        projectController.modify
      )
      .delete(
        '/project/:projectId',
        authenticationMiddleware,
        projectController.remove
      )

      // USERS MICROSERVICE

      // Users
      .get('/user', authenticationMiddleware, usersController.getAllUsers)
      .post('/user', usersController.registerUser)
      .post('/user/session', usersController.loginUser)

      // Admins
      .post('/admin', usersController.registerAdmin)
      .post('/admin/session', usersController.loginAdmin)
  );
};
