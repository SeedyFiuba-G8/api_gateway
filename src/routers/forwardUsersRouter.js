const express = require('express');

module.exports = function $forwardUsersRouter(
  authMiddleware,
  adminAuthMiddleware,
  forwardingController
) {
  const controller = forwardingController.users;

  return (
    express
      .Router()

      // USERS

      .get('/users', authMiddleware, adminAuthMiddleware, controller)
      .post('/users', controller)
      .get('/users/:userId/profile', controller)

      // ADMINS

      .post('/admins', authMiddleware, adminAuthMiddleware, controller)
  );
};
