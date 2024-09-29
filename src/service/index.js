import getSchemas from './schema/getSchemas.service.js';
import aiRepository from '../database/repository/ai.repository.js';
import mongoRepository from '../database/repository/mongo.repository.js';

export default {
  get_schemas: getSchemas,
  ai_repository: aiRepository,
  // mongo_repository: mongoRepository
}