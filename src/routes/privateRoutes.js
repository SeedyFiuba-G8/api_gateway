const express = require('express');

module.exports = function $privateRoutes(authMiddleware) {
  return (
    express
      .Router()

      // JWT Auth
      .use(authMiddleware)

      // Testing JWT
      .get('/myself', (req, res) => res.json(req.context.session))
  );
};
