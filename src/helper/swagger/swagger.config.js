import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import aiPath from './path/ai/ai.swagger.js';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentação',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
    servers: [
      {
        url: `http://localhost:${process.env.EXPRESS_PORT}`,
      },
    ],
  },
  apis: ['./route/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

swaggerDocs.paths = {
  ...swaggerDocs.paths,
  ...aiPath,
};

const setupSwagger = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
