import jwt from "jsonwebtoken";
import User from "../models/User.js";
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Protect Middleware - Token:", token ? "Found" : "Missing");
    if (!token) {
      console.log("Protect Middleware - 401: No token provided");
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }
    if (!process.env.JWT_SECRET) {
      console.error("Protect Middleware - Error: JWT_SECRET missing");
      throw new Error("JWT_SECRET is not configured");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Protect Middleware - Decoded:", decoded);
    if (!decoded || !decoded.userId) {
      console.log("Protect Middleware - 401: Invalid token format");
      return res.status(401).json({ message: "Invalid token format" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Protect Middleware - 401: User not found");
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Protect Middleware - Error:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Authentication error" });
  }
};
export { protect };
