const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = function $authMiddleware(config, errors) {
  return async function authMiddleware(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return next(errors.noTokenProvided);

    const [type, token] = bearerHeader.split(' ');
    if (type !== 'Bearer') return next(errors.invalidTokenType);

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
