const { URL } = require('url');
const querystring = require('querystring');
const _ = require('lodash');

module.exports = function $urlFactory() {
  let queryParams = '';
  return function urlFactory(route, service, query) {
    const { baseUrl } = service;

    if (!_.isEmpty(query)) {
      queryParams = '?';
      queryParams += querystring.stringify(query);
    }

    const url = new URL(route + queryParams, baseUrl);
    return url.href;
  };
};
