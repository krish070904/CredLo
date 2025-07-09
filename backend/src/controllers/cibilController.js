import User from "../models/User.js";
const SCORE_CONFIG = {
  BOUNDS: { MIN: 300, MAX: 900 },
  CHECK_PENALTY: { MIN: 4, MAX: 5 },
  INACTIVITY_REWARD: { MIN: 5, MAX: 6 },
  INACTIVITY_THRESHOLD_DAYS: 7,
};
const SCORE_RANGES = {
  EXCELLENT: { min: 800, max: 900 },
  GOOD: { min: 750, max: 799 },
  FAIR: { min: 650, max: 749 },
  POOR: { min: 550, max: 649 },
  CRITICAL: { min: 300, max: 549 },
};
const COMMENTS = {
  EXCELLENT: [
    { text: "Excellent", emoji: "🌟" },
    { text: "Outstanding", emoji: "🏆" },
    { text: "Superb", emoji: "💎" },
    { text: "Exceptional", emoji: "⭐" },
  ],
  GOOD: [
    { text: "Very Good", emoji: "👍" },
    { text: "Great", emoji: "✨" },
    { text: "Impressive", emoji: "🎯" },
    { text: "Solid", emoji: "💪" },
  ],
  FAIR: [
    { text: "Fair", emoji: "👌" },
    { text: "Average", emoji: "📊" },
    { text: "Moderate", emoji: "⚖️" },
    { text: "Decent", emoji: "🔵" },
  ],
  POOR: [
    { text: "Needs Improvement", emoji: "📉" },
    { text: "Below Average", emoji: "⚠️" },
    { text: "Work Required", emoji: "🔧" },
    { text: "Attention Needed", emoji: "⏰" },
  ],
  CRITICAL: [
    { text: "Critical", emoji: "🚨" },
    { text: "Poor", emoji: "❌" },
    { text: "Urgent Action", emoji: "⛔" },
    { text: "Needs Attention", emoji: "🔴" },
  ],
};
const clampScore = (score) => {
  return Math.min(
    Math.max(Math.round(score), SCORE_CONFIG.BOUNDS.MIN),
    SCORE_CONFIG.BOUNDS.MAX,
  );
};
const calculateDaysSince = (date) => {
  if (!date) return Infinity;
  return (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
};
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomComment = (commentArray) => {
  return commentArray[Math.floor(Math.random() * commentArray.length)];
};
const determineScoreCategory = (score) => {
  if (score >= SCORE_RANGES.EXCELLENT.min) return "EXCELLENT";
  if (score >= SCORE_RANGES.GOOD.min) return "GOOD";
  if (score >= SCORE_RANGES.FAIR.min) return "FAIR";
  if (score >= SCORE_RANGES.POOR.min) return "POOR";
  return "CRITICAL";
};
const calculateScoreAdjustment = (user) => {
  let adjustment = 0;
  const daysSinceLastCheck = calculateDaysSince(user.lastCibilCheck);
  if (daysSinceLastCheck >= SCORE_CONFIG.INACTIVITY_THRESHOLD_DAYS) {
    const reward = getRandomInRange(
      SCORE_CONFIG.INACTIVITY_REWARD.MIN,
      SCORE_CONFIG.INACTIVITY_REWARD.MAX,
    );
    adjustment += reward;
  }
  const penalty = getRandomInRange(
    SCORE_CONFIG.CHECK_PENALTY.MIN,
    SCORE_CONFIG.CHECK_PENALTY.MAX,
  );
  adjustment -= penalty;
  return adjustment;
};
const getCibilScore = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.log("Cibil Controller: No user in req");
      return res.status(401).json({ message: "Authentication required" });
    }
    console.log("Fetching CIBIL for user:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const scoreAdjustment = calculateScoreAdjustment(user);
    const currentScore = user.cibilScore || 750;
    user.cibilScore = clampScore(currentScore + scoreAdjustment);
    user.lastCibilCheck = new Date();
    await user.save();
    const category = determineScoreCategory(user.cibilScore);
    const { text: comment, emoji } = getRandomComment(COMMENTS[category]);
    res.json({
      cibilScore: user.cibilScore,
      comment,
      emoji,
      lastChecked: user.lastCibilCheck,
      changeAmount: scoreAdjustment,
    });
  } catch (error) {
    const statusCode = error.name === "CastError" ? 400 : 500;
    res.status(statusCode).json({
      message:
        statusCode === 400 ? "Invalid user ID" : "Error fetching CIBIL score",
    });
  }
};
export { getCibilScore };
