import express from 'express';
import {
    createFood,
    getFood,
    getFoodById,
    updateFood,
    deleteFood
} from '../controllers/food.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',authMiddleware,createFood);
router.get('/',authMiddleware,getFood);
router.get('/:id',authMiddleware,getFoodById);
router.put('/:id',authMiddleware,updateFood);
router.delete('/:id',authMiddleware,deleteFood);


export default router;