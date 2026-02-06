import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import cibilRoutes from "./src/routes/cibilRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import loanRoutes from "./src/routes/loanRoutes.js";
import cardRoutes from "./src/routes/cardRoutes.js";
import enquiryRoutes from "./src/routes/enquiryRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";
import helmet from "helmet";
import compression from "compression";
dotenv.config();
connectDB();
const app = express();
app.use(compression());
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Origin:', req.headers.origin);
  console.log('Cookies:', req.cookies);
  next();
});
app.use(helmet());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cibil", cibilRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/documents", documentRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} [Rate Limits: Relaxed]`),
);
