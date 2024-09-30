import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import userSwagger from './path/user/user.swagger.js';
import userNaturalSwagger from './path/user/userNatural.swagger.js';
dotenv.config();
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'GPT Integration API',
      version: '1.0.0',
      description: `This API serves as a direct integration with GPT, showcasing the power of GPT combined with various tools and how it behaves in response to different requests. All routes described in this Swagger documentation are fictional. Every request sent to the API is processed by middleware that identifies the method used, the request body, and the headers. It then utilizes its tools to determine the appropriate actions to take with the request.

Notably, the API is capable of handling both standard JSON calls and natural language inputs, such as “I want to create a user. My name is John Doe, my phone number is xxx-xxx-xxxx,” among others.`,
    },
    servers: [
      {
        url: `http://${process.env.SWAGGER_URL}:${process.env.EXPRESS_PORT}`,
      },
    ],
  },
  apis: ['./route/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

swaggerDocs.paths = {
  ...swaggerDocs.paths,
  ...userSwagger,
  ...userNaturalSwagger,
};

const setupSwagger = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
