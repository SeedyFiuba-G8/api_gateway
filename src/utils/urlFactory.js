const { URL } = require('url');

module.exports = function $urlFactory() {
  return function urlFactory(route, service) {
    const { baseUrl } = service;
    const url = new URL(route, baseUrl);
    return url.href;
  };
};
