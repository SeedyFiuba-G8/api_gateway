const express = require('express');
const swaggerUi = require('swagger-ui-express');

module.exports = function docsRouter(apiSpecs) {
  const SwaggerOptions = {
    customCss: `
    .swagger-ui .topbar {
      display: none;
    }`,

    customSiteTitle: 'Seedy FIUBA API'
  };

  return express
    .Router()
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(apiSpecs, SwaggerOptions));
};
