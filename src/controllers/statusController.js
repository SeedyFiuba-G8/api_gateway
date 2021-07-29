module.exports = function $statusController(
  serviceInfo,
  expressify,
  statusService
) {
  return expressify({
    health,
    info,
    ping,
    pingAll
  });

  async function health(req, res) {
    const servicesHealth = await statusService.healthServices();

    const response = {
      status: 'UP',
      services: servicesHealth
    };

    return res.status(200).json(response);
  }

  async function info(req, res) {
    const servicesInfo = await statusService.infoServices();

    return res.status(200).json({
      apigateway: serviceInfo,
      ...servicesInfo
    });
  }

  async function ping(req, res) {
    return res.status(200).json({ status: 'ok' });
  }

  async function pingAll(req, res) {
    const servicesStatus = await statusService.pingServices();

    const response = {
      status: 'ok',
      services: servicesStatus
    };

    return res.status(200).json(response);
  }
};
