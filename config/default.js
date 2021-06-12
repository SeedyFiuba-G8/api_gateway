const _ = require('lodash');

module.exports = {
  cors: {},
  express: {
    host: '0.0.0.0',
    port: _.get(process.env, 'PORT', 3000)
  },
  jwt: {
    key: _.get(process.env, 'JWT_KEY', 'localkey'),
    expiration: '1h'
  },
  log: {
    console: {
      enabled: true,
      level: 'info',
      timestamp: true,
      prettyPrint: true,
      json: false,
      colorize: true,
      stringify: false,
      label: 'api_gateway'
    }
  },
  services: {
    apikeys: {
      baseUrl: undefined
    },
    core: {
      baseUrl: 'https://sf-tdp2-core.herokuapp.com/'
    },
    users: {
      baseUrl: 'https://sf-tdp2-users.herokuapp.com/'
    }
  },
  timeouts: {
    ping: 500, // ms
    health: 2000 // ms
  }
};
