const _ = require('lodash');

module.exports = {
  cors: {},
  express: {
    host: '0.0.0.0',
    port: _.get(process.env, 'PORT', 3000)
  },
  fetch: {
    forwardHeaders: [
      {
        header: 'uid',
        contextField: 'session.id'
      },
      {
        header: 'uid',
        contextField: 'uid'
      }
    ],
    timeout: 10000 // ms
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
      prettyPrint: false,
      json: false,
      colorize: false,
      stringify: true,
      label: 'api_gateway'
    }
  },
  monitoring: {
    enabled: true
  },
  services: {
    apikeys: {
      baseUrl: undefined
    },
    core: {
      baseUrl: 'https://sf-tdp2-core.herokuapp.com/'
    },
    sc: {
      baseUrl: 'https://sf-tdp2-sc.herokuapp.com/'
    },
    users: {
      baseUrl: 'https://sf-tdp2-users.herokuapp.com/'
    }
  }
};
