import express from "express";
import { getLoanRecommendations } from "../controllers/loanController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/recommend", protect, getLoanRecommendations);
export default router;
