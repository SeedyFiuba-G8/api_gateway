module.exports = {
  logger: {
    format: 'local',
    http: {
      enabled: false
    }
  },
  services: {
    apikeys: {
      enabled: false,
      baseUrl: 'http://apikeys-test/'
    },
    core: {
      baseUrl: 'http://core-test/'
    },
    sc: {
      baseUrl: 'http://sc-test/'
    },
    users: {
      baseUrl: 'http://users-test/'
    }
  },
  monitoring: false
};
