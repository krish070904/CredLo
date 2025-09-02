import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "../middleware/asyncHandler.js";
import fs from "fs";
export const analyzeDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new Error("Please upload an image file");
  }
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API Key missing");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const imagePath = req.file.path;
  const imageData = fs.readFileSync(imagePath);
  const imageBase64 = imageData.toString("base64");
  fs.unlinkSync(imagePath);
  const prompt = `
    Analyze this financial document (Bank Statement or Payslip).
    Extract the following details accurately:
    1. Account Holder Name (or Employee Name)
    2. Bank Name (or Employer Name)
    3. Monthly Income (or Salary Credited, look for 'Salary', 'Credit', 'NEFT' patterns). Estimate an average if multiple entries exist.
    Return ONLY a JSON object:
    {
        "holderName": "Name found",
        "institutionName": "Bank/Company",
        "monthlyIncome": 50000,
        "confidence": "High/Medium/Low"
    }
    `;
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType: req.file.mimetype,
      },
    },
  ]);
  const response = await result.response;
  let text = response.text();
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  try {
    const data = JSON.parse(text);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to parse AI response", raw: text });
  }
});
