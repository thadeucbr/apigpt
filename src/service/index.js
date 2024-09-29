import getSchemas from './schema/getSchemas.service.js';
import aiRepository from '../database/repository/ai.repository.js';

export default {
  getSchemas,
  ai_repository: aiRepository
}