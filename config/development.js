const _ = require('lodash');

module.exports = {
  logger: {
    format: 'local',
    http: {
      enabled: false
    }
  },
  monitoring: false,
  services: {
    apikeys: {
      enabled: false,
      baseUrl: _.get(
        process.env,
        'APIKEYS_URL',
        'https://sf-tdp2-apikeys-dev.herokuapp.com/'
      )
    },
    core: {
      baseUrl: _.get(
        process.env,
        'CORE_URL',
        'https://sf-tdp2-core-dev.herokuapp.com/'
      )
    },
    sc: {
      baseUrl: _.get(
        process.env,
        'SC_URL',
        'https://sf-tdp2-sc-dev.herokuapp.com/'
      )
    },
    users: {
      baseUrl: _.get(
        process.env,
        'USERS_URL',
        'https://sf-tdp2-users-dev.herokuapp.com/'
      )
    }
  }
};
