module.exports = function $metricController(
  expressify,
  forwardingController,
  services,
  urlFactory
) {
  return expressify({
    getAccountBasic,
    getAccountEvents
  });

  function getAccountBasic(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics'),
      services.users.baseUrl
    );
    return forwardingController.forward(req, res);
  }

  function getAccountEvents(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics/events'),
      services.users.baseUrl
    );
    return forwardingController.forward(req, res);
  }
};
