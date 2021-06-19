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
      .use('/project', authMiddleware)
      .get('/project', projectController.getAll)
      .post('/project', projectController.create)
      .get('/project/:projectId', projectController.get)
      .put('/project/:projectId', projectController.modify)
      .delete('/project/:projectId', projectController.remove)

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
