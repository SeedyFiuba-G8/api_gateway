const express = require('express');

module.exports = function $app(
  loggingMiddleware,
  docsRouter,
  apiRouter,
  errorHandlerMiddleware
) {
  const app = express();

  // Pre middleware
  app.use(express.json());
  app.use(loggingMiddleware);

  // Routers
  app.use(docsRouter);
  app.use(apiRouter);

  // Post middleware
  app.use(errorHandlerMiddleware);

  return app;
};
