const path = require('path');
const yamljs = require('yamljs');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = function $apiSpecs() {
  const swaggerDefinition = yamljs.load(
    path.join(__dirname, '../../assets/api/index.yml')
  );

  const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../../assets/api/**/*.yml')]
  };

  return swaggerJSDoc(options);
};
