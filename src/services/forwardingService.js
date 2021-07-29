module.exports = function $forwardingService(fetch) {
  return {
    forward
  };

  function forward(context, { url, method, body, headers }) {
    // if we need to add some more logic to the forwarding, we can do it here
    // this way we keep the basic structure controller-service

    return fetch(url, { method, body, headers }, context);
  }
};
