import express from 'express';

import aiController from '../../controller/ai/ai.controller.js';

const aiRouter = express.Router();

aiRouter.post('/ai', aiController);

export default aiRouter;