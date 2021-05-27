module.exports = function statusController(usersGateway, logger) {
  async function health(req, res, next) {
    let usersHealth;

    try {
      [usersHealth] = await Promise.all([usersGateway.health()]);
    } catch (err) {
      logger.warn('Error in statusController.health:', err);
      return next(err);
    }

    const response = {
      apikeys: 'FINE I HOPE',
      core: 'FINE I HOPE',
      users: usersHealth
    };

    return res.status(200).json(response);
  }

  function ping(req, res) {
    const response = {
      status: 'ok'
    };

    return res.status(200).json(response);
  }

  async function pingAll(req, res) {
    const [usersStatus] = await Promise.all([usersGateway.ping()]);

    const response = {
      status: 'ok',
      services: {
        apikeys: '?',
        core: '?',
        users: usersStatus ? 'ok' : 'timed out'
      }
    };

    return res.status(200).json(response);
  }

  return {
    health,
    ping,
    pingAll
  };
};
