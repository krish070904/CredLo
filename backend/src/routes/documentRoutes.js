import express from "express";
import multer from "multer";
import { analyzeDocument } from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";
import path from "path";
import fs from "fs";
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const router = express.Router();
router.post("/analyze", protect, upload.single("document"), analyzeDocument);
export default router;
