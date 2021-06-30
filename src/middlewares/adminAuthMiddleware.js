module.exports = function $adminAuthMiddleware(errors) {
  return function authMiddleware(req, res, next) {
    const { type } = req.context.session;

    if (type !== 'ADMIN')
      return next(errors.create(403, 'Admin rights needed'));

    return next();
  };
};
