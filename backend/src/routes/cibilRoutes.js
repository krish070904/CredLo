import express from "express";
import { getCibilScore } from "../controllers/cibilController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/score", protect, getCibilScore);
export default router;
