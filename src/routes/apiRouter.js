const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function apiRouter(
  apiValidatorMiddleware,
  authMiddleware,
  config,
  statusController
) {
  return (
    express
      .Router()
      // Redirect root to api docs
      .get('/', (req, res) => res.redirect('/api-docs'))

      // OpenAPI Validator Middleware
      .use(apiValidatorMiddleware)

      // STATUS ROUTES
      .get('/ping', statusController.ping)

      .get('/ping/all', statusController.pingAll)

      .get('/health', statusController.health)

      // ROUTES
      .get('/mock', (req, res) => res.status(200).send('mock route'))

      // Users
      .post('/user', (req, res, next) => {
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

      .post('/user/session', (req, res) => res.send('not implemented yet'))

      .get('/user/session', authMiddleware, (req, res) =>
        res.json(req.context.session)
      )
  );
};
