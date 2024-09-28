import express from 'express';
import aiRouter from './ai/ai.route.js';

const router = express.Router();

router.use(aiRouter);

export default router;