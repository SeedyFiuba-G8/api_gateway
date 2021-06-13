const express = require('express');

module.exports = function $app(
  apiRouter,
  corsMiddleware,
  docsRouter,
  errorHandlerMiddleware,
  loggingMiddleware,
  unhandledErrorMiddleware
) {
  const app = express();

  // Pre middleware
  app.use(corsMiddleware);
  app.use(unhandledErrorMiddleware);
  app.use(loggingMiddleware);
  app.use(express.json());

  // Routers
  app.use(docsRouter);
  app.use(apiRouter);

  // Post middleware
  app.use(errorHandlerMiddleware);

  return app;
};
