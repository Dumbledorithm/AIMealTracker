import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { estimateCalories } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/estimate", authMiddleware, estimateCalories);

export default router;