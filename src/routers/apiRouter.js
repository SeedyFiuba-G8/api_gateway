const express = require('express');

module.exports = function apiRouter(
  adminAuthMiddleware,
  apiValidatorMiddleware,
  authMiddleware,
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

      .get('/health', statusController.health)
      .get('/ping', statusController.ping)
      .get('/pingAll', statusController.pingAll)

      // CORE MICROSERVICE

      // Projects
      .use('/projects', authMiddleware)
      .get('/projects', projectController.getBy)
      .post('/projects', projectController.create)
      .get('/projects/:projectId', projectController.get)
      .put('/projects/:projectId', projectController.modify)
      .delete('/projects/:projectId', projectController.remove)

      // USERS MICROSERVICE

      // Users
      .get(
        '/users',
        authMiddleware,
        adminAuthMiddleware,
        usersController.getAllUsers
      )
      .post('/users', usersController.registerUser)
      .post('/users/session', usersController.loginUser)

      // Admins
      .post(
        '/admins',
        authMiddleware,
        adminAuthMiddleware,
        usersController.registerAdmin
      )
      .post('/admins/session', usersController.loginAdmin)
  );
};
