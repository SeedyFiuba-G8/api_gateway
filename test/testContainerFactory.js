const path = require('path');
const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const containerFactory = require('../src/containerFactory');

function createContainer() {
  const container = containerFactory.createContainer();
  const entries = ['support'];

  container.register('serviceInfo', function $serverInfo() {
    return {
      creationDate: new Date('2021-06-01T01:00:00.000Z'),
      description:
        'Microservice description.'
    };
  });

  container.register('axiosMock', function $axiosMock() {
    return new AxiosMockAdapter(axios);
  });

  entries.forEach((entry) => container.load(path.join(__dirname, entry)));

  return container;
}

module.exports = {
  createContainer
};
