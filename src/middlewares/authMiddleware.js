module.exports = function $adminAuthMiddleware(errors) {
  return {
    admin,
    user
  };

  function admin(req, res, next) {
    return innerAuth(req, next, 'ADMIN');
  }

  function user(req, res, next) {
    return innerAuth(req, next, 'USER');
  }

  // Private

  function innerAuth(req, next, typeNeeded) {
    const { type } = req.context.session;

    if (type !== typeNeeded)
      return next(
        errors.create(403, `${capitalize(typeNeeded)} rights needed`)
      );

    return next();
  }

  // Aux

  function capitalize(type) {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }
};
