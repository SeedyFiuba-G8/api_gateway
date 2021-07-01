module.exports = function $statusController(expressify, statusService) {
  return expressify({
    health,
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
