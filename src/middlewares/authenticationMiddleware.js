const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = function $authenticationMiddleware(config, errors) {
  return async function authenticationMiddleware(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader)
      return next(errors.BadRequest('No bearer token provided'));

    const [type, token] = bearerHeader.split(' ');
    if (type !== 'Bearer')
      return next(errors.BadRequest('Invalid token type, not bearer'));

    let sessionPayload;

    try {
      sessionPayload = jwt.verify(token, config.jwt.key);
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
