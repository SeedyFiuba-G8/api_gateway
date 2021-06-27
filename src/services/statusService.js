module.exports = function statusService(coreGateway, usersGateway) {
  return {
    servicesHealth,
    pingServices
  };

  /**
   * @returns {Promise}
   */
  async function servicesHealth() {
    const [coreHealth, usersHealth] = await Promise.all([
      coreGateway.health(),
      usersGateway.health()
    ]);

    return {
      apikeys: {},
      core: coreHealth,
      users: usersHealth
    };
  }

  /**
   * @returns {Promise}
   */
  async function pingServices() {
    const [coreStatus, usersStatus] = await Promise.all([
      coreGateway.ping(),
      usersGateway.ping()
    ]);

    return {
      apikeys: '?',
      core: coreStatus,
      users: usersStatus
    };
  }
};
