import * as dotenv from 'dotenv';
import express from 'express';
import startMongoose from './database/config/mongoose.config.js';
import router from './route/index.js';

dotenv.config();

const start = async () => {
  await startMongoose();
  
  const app = express();
  
  app.use(express.json());
  app.use(router);
  app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server running on port ${process.env.EXPRESS_PORT}`);
  });
}

start().catch(console.error);
