const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function $publicRoutes(config, statusController) {
  return (
    express
      .Router()

      // STATUS ROUTES
      .get('/ping', statusController.ping)

      .get('/ping/all', statusController.pingAll)

      .get('/health', statusController.health)

      // ROUTES
      .get('/mock', (req, res) => res.status(200).send('mock route'))

      // Testing JWT
      .post('/myself', (req, res, next) => {
        const sessionData = {
          name: 'Mauris',
          uuid: 'algunidfalopa'
        };

        let token;

        try {
          token = jwt.sign(sessionData, config.jwt.key, { expiresIn: '30s' });
        } catch (err) {
          return next(err);
        }

        return res.json({ token });
      })
  );
};
