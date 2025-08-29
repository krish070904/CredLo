import express from "express";
import { getTrendingCards } from "../controllers/cardController.js";
const router = express.Router();
router.get("/trending", getTrendingCards);
export default router;
