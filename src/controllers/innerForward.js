module.exports = function $innerForward(apikeyUtils, forwardingService) {
  return function innerForward(req, res, apikey) {
    const { body, context, method, url } = req;

    return forwardingService
      .forward(context, {
        url,
        method,
        body,
        headers: apikeyUtils.headers(apikey)
      })
      .then(({ status, data }) => {
        if (!data) return res.status(status).send();
        return res.status(status).json(data);
      });
  };
};
