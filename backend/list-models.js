import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const listModels = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("API Key missing");
    return;
  }
  try {
    console.log("Using Key:", apiKey.substring(0, 5) + "...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Attempting to generate with gemini-1.5-flash...");
    const result = await model.generateContent("Test");
    console.log("Success with gemini-1.5-flash");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
listModels();
