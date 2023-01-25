import express from 'express';
import { generatIemage } from '../controllers/imgAiController.js';

const router = express.Router();

router.post('/generateimage', generatIemage);

export default router;
