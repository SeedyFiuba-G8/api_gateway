const _ = require('lodash');

module.exports = {
  log: {
    console: {
      level: 'debug'
    }
  },
  services: {
    apikeys: {
      baseUrl: undefined
    },
    core: {
      baseUrl: _.get(
        process.env,
        'CORE_URL',
        'https://sf-tdp2-core-dev.herokuapp.com/'
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
