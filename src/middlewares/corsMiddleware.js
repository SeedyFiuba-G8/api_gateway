const cors = require('cors');

module.exports = function $corsMiddleware(config) {
  const { allowedOrigins } = config.cors;
  if (!allowedOrigins) return cors();

  return cors({
    function(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  });
};
