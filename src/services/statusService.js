module.exports = function statusService(logger, usersGateway) {
  /**
   * Check health of all services
   *
   * @returns {Promise}
   */
  async function servicesHealth() {
    const [usersHealth] = await Promise.all([usersGateway.health()]);

    return {
      apikeys: {},
      core: {},
      users: usersHealth
    };
  }

  /**
   * Check services respond time with ping
   *
   * @returns {Promise}
   */
  async function pingServices() {
    const [usersStatus] = await Promise.all([usersGateway.ping()]);

    return {
      apikeys: '?',
      core: '?',
      users: usersStatus
    };
  }

  return {
    servicesHealth,
    pingServices
  };
};
