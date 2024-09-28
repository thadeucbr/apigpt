import * as dotenv from 'dotenv';
import express from 'express';
import startMongoose from './database/config/mongoose.config.js';

dotenv.config();

const start = async () => {
  const app = express();

  await startMongoose();
  app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server running on port ${process.env.EXPRESS_PORT}`);
  });
}

start().catch(console.error);
