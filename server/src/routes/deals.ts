import express from 'express';
import dealsConroller from '../controllers/dealsConroller.js';

const router = express.Router();

router.get('/getAll', dealsConroller.getAll);

export default router;
