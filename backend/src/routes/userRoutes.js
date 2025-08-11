import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/me", protect, async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      mobile: req.user.mobile,
      city: req.user.city,
      state: req.user.state,
      cibilScore: req.user.cibilScore,
      lastCibilCheck: req.user.lastCibilCheck,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});
export default router;
