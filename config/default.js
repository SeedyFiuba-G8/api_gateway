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
      }
    ],
    timeout: 300000 // ms
  },
  jwt: {
    key: _.get(process.env, 'JWT_KEY', 'localkey'),
    expiration: '1h'
  },
  logger: {
    console: {
      enabled: true,
      level: _.get(process.env, 'LOGGER_LEVEL', 'info'),
      prettyPrint: true
    },
    http: {
      enabled: true,
      level: _.get(process.env, 'LOGGER_LEVEL', 'info'),
      host: _.get(process.env, 'SUMOLOGIC_HOST'),
      path: _.get(process.env, 'SUMOLOGIC_PATH'),
      ssl: true
    }
  },
  monitoring: true,
  services: {
    apikeys: {
      header: 'x-api-key',
      baseUrl: 'https://sf-tdp2-apikeys-main.herokuapp.com/',
      key: {
        name: 'apikeys-validation-key',
        value: _.get(process.env, 'APIKEYS_KEY', 'SeedyFiubaApigateway')
      }
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
