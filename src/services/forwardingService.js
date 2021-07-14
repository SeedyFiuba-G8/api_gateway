module.exports = function $forwardingService(gatewayUtils) {
  return {
    forward
  };

  function forward(context, { url, method, body }) {
    // if we need to add some more logic to the forwarding, we can do it here
    // this way we keep the basic structure controller-service

    return gatewayUtils.fetch(url, { method, body }, context);
  }
};
