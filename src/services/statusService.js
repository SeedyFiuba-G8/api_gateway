const _ = require('lodash');

module.exports = function statusService(services, statusGateway) {
  return {
    healthServices,
    pingServices
  };

  async function healthServices() {
    return awaitMethodForServices(statusGateway.health, {});
  }

  async function pingServices() {
    return awaitMethodForServices(statusGateway.ping, '?');
  }

  // Private

  async function awaitMethodForServices(method, defaultValue) {
    const response = {};
    const promisesToAwait = [];

    Object.entries(services).forEach(([service, { baseUrl }]) => {
      if (!baseUrl) {
        response[service] = defaultValue;
        return;
      }

      promisesToAwait.push(
        method(baseUrl).then((res) => _.set(response, service, res))
      );
    });

    await Promise.all(promisesToAwait);
    return response;
  }
};
