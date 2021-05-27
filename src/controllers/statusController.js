module.exports = function statusController() {
  async function health(req, res) {
    const response = {
      users: 'FINE I HOPE',
      core: 'FINE I HOPE',
      apikeys: 'FINE I HOPE'
    };

    return res.status(200).json(response);
  }

  function ping(req, res) {
    const response = {
      status: 'ok'
    };

    return res.status(200).json(response);
  }

  return {
    health,
    ping
  };
};
