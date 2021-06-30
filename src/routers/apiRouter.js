const express = require('express');

module.exports = function apiRouter(
  adminAuthMiddleware,
  adminController,
  apiValidatorMiddleware,
  authMiddleware,
  userController,
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
      .get('/users', authMiddleware, adminAuthMiddleware, userController.getAll)
      .post('/users', userController.register)
      .post('/users/session', userController.login)
      .get('/users/:userId/profile', userController.getProfile)

      // Admins
      .post(
        '/admins',
        authMiddleware,
        adminAuthMiddleware,
        adminController.register
      )
      .post('/admins/session', adminController.login)
  );
};
