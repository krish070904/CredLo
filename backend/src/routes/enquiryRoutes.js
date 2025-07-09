import express from "express";
import {
  createEnquiry,
  getMyEnquiries,
} from "../controllers/enquiryController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", protect, createEnquiry);
router.get("/", protect, getMyEnquiries);
export default router;
