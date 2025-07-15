import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
const SCORE_BOUNDS = { MIN: 300, MAX: 900 };
const LOGIN_FLUCTUATION = { MIN: -2, MAX: 3 };
const INITIAL_SCORE_RANGE = { MIN: 650, MAX: 850 };
const validateLoginInput = (identifier, password) => {
  if (!identifier || !password) {
    throw new Error("Email/Mobile and password are required");
  }
  if (typeof identifier !== "string" || typeof password !== "string") {
    throw new Error("Invalid input format");
  }
  if (identifier.trim().length === 0 || password.trim().length === 0) {
    throw new Error("Email/Mobile and password cannot be empty");
  }
};
const validateRegistrationInput = (data) => {
  const requiredFields = [
    "name",
    "email",
    "password",
    "mobile",
    "dob",
    "address",
    "city",
    "state",
  ];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(
        `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
      );
    }
  }
  if (data.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error("Invalid email format");
  }
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(data.mobile)) {
    throw new Error("Mobile number must be 10 digits");
  }
};
const clampScore = (score) => {
  return Math.min(Math.max(score, SCORE_BOUNDS.MIN), SCORE_BOUNDS.MAX);
};
const generateRandomScore = () => {
  const range = INITIAL_SCORE_RANGE.MAX - INITIAL_SCORE_RANGE.MIN + 1;
  return Math.floor(Math.random() * range) + INITIAL_SCORE_RANGE.MIN;
};
const applyLoginFluctuation = (currentScore) => {
  const range = LOGIN_FLUCTUATION.MAX - LOGIN_FLUCTUATION.MIN + 1;
  const fluctuation = Math.floor(Math.random() * range) + LOGIN_FLUCTUATION.MIN;
  return clampScore((currentScore || 750) + fluctuation);
};
const authUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    validateLoginInput(identifier, password);
    const trimmedIdentifier = identifier.trim();
    const user = await User.findOne({
      $or: [
        { email: trimmedIdentifier.toLowerCase() },
        { mobile: trimmedIdentifier },
      ],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    user.cibilScore = applyLoginFluctuation(user.cibilScore);
    await user.save();
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      cibilScore: user.cibilScore,
      lastCibilCheck: user.lastCibilCheck,
    });
  } catch (error) {
    res.status(
      error.message.includes("required") || error.message.includes("Invalid")
        ? 400
        : 500,
    );
    res.json({
      message: error.message || "Server error during authentication",
    });
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, dob, address, city, state } =
      req.body;
    validateRegistrationInput(req.body);
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile: mobile }],
    });
    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email.toLowerCase()
            ? "Email already registered"
            : "Mobile number already registered",
      });
    }
    const randomCibilScore = generateRandomScore();
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      mobile: mobile.trim(),
      dob: new Date(dob),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      cibilScore: randomCibilScore,
    });
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      cibilScore: user.cibilScore,
    });
  } catch (error) {
    const statusCode =
      error.message.includes("required") ||
      error.message.includes("Invalid") ||
      error.message.includes("already")
        ? 400
        : 500;
    res.status(statusCode);
    res.json({ message: error.message || "Server error during registration" });
  }
};
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during logout" });
  }
};
export { authUser, registerUser, logoutUser };
