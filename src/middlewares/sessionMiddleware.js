const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = function $sessionMiddleware(config, errors) {
  return async function sessionMiddleware(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader)
      return next(errors.create(400, 'No bearer token provided'));

    const [type, token] = bearerHeader.split(' ');
    if (type !== 'Bearer')
      return next(errors.create(400, 'Invalid token type, not bearer'));

    let sessionPayload;

    try {
      sessionPayload = await jwt.verify(token, config.jwt.key);
    } catch (err) {
      return next(err);
    }

    _.set(req, 'context.session', {
      token: { type, signature: token },
      ...sessionPayload
    });

    return next();
  };
};
