module.exports = function statusService(usersGateway) {
  return {
    servicesHealth,
    pingServices
  };

  /**
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
};
