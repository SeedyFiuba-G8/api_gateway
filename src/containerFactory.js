const dependable = require('dependable');
const path = require('path');

function createContainer() {
  const container = dependable.container();
  const entries = [
    'app.js',
    'controllers',
    'gateways',
    'middlewares',
    'routes',
    'services',
    'utils'
  ];

  // eslint-disable-next-line prefer-arrow-callback
  container.register('config', function $config() {
    if (!process.env.NODE_CONFIG_DIR) {
      process.env.NODE_CONFIG_DIR = `${__dirname}/../config`;
    }

    // eslint-disable-next-line global-require
    return require('config');
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('services', function $services(config) {
    return config.services;
  });

  entries.forEach((entry) => container.load(path.join(__dirname, entry)));

  return container;
}

module.exports = {
  createContainer
};
