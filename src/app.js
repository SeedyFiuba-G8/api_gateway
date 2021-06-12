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
  app.use(express.json());
  app.use(corsMiddleware);
  app.use(loggingMiddleware);

  // Routers
  app.use(docsRouter);
  app.use(apiRouter);

  // Post middleware
  app.use(errorHandlerMiddleware);

  return app;
};
