module.exports = function statusController(expressify, statusService) {
  return expressify({
    health,
    ping,
    pingAll
  });

  /**
   * @returns {Promise}
   */
  async function health(req, res) {
    const servicesHealth = await statusService.servicesHealth();

    const response = {
      status: 'UP',
      services: servicesHealth
    };

    return res.status(200).json(response);
  }

  /**
   * @returns {Promise}
   */
  function ping(req, res) {
    const response = {
      status: 'ok'
    };

    return res.status(200).json(response);
  }

  /**
   * @returns {Promise}
   */
  async function pingAll(req, res) {
    const servicesStatus = await statusService.pingServices();

    const response = {
      status: 'ok',
      services: servicesStatus
    };

    return res.status(200).json(response);
  }
};
