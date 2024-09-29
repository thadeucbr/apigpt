import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import startMongoose from './database/config/mongoose.config.js';
import router from './route/index.js';
import setupSwagger from './helper/swagger/swagger.config.js';
import gptMiddleware from './middleware/ai/gpt.middleware.js';


const start = async () => {
  // await startMongoose();
  
  const app = express();
  
  app.use(express.json());
  app.use(gptMiddleware)
  app.use(router);

  setupSwagger(app)

  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    console.log(`Server running on port ${process.env.EXPRESS_PORT || 3000}`);
  });
}

start().catch(console.error);
