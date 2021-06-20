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

      .get('/ping', statusController.ping)
      .get('/pingAll', statusController.pingAll)
      .get('/health', statusController.health)

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
        '/user',
        authMiddleware,
        adminAuthMiddleware,
        usersController.getAllUsers
      )
      .post('/user', usersController.registerUser)
      .post('/user/session', usersController.loginUser)

      // Admins
      .post(
        '/admin',
        authMiddleware,
        adminAuthMiddleware,
        usersController.registerAdmin
      )
      .post('/admin/session', usersController.loginAdmin)
  );
};
