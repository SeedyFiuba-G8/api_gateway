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
      baseUrl: undefined
    },
    users: {
      baseUrl: _.get(
        process.env,
        'USERS_URL',
        'http://sf-tdp2-users-dev.herokuapp.com/'
      )
    }
  }
};
