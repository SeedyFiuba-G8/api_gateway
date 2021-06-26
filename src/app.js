const express = require('express');

module.exports = function $app(
  corsMiddleware,
  errorHandlerMiddleware,
  loggingMiddleware,
  docsRouter,
  apiRouter
) {
  const app = express();

  // Pre middleware
  app.use(corsMiddleware);
  app.use(loggingMiddleware);
  app.use(express.json());

  // Routers
  app.use(docsRouter);
  app.use(apiRouter);

  // Post middleware
  app.use(errorHandlerMiddleware);

  return app;
};
