import express from 'express';
import {
    addLog,
    getLogsByDay,
    getWeeklyLogs,
    deleteLog
} from '../controllers/log.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/",authMiddleware,addLog);
router.get('/day',authMiddleware,getLogsByDay);
router.get("/week",authMiddleware,getWeeklyLogs);
router.delete('/:id',authMiddleware,deleteLog);

export default router;