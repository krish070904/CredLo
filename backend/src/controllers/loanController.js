import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "../middleware/asyncHandler.js";
export const getLoanRecommendations = asyncHandler(async (req, res) => {
  const {
    loanType,
    loanAmount,
    loanTenure,
    monthlyIncome,
    employmentType,
    cibilScore,
    preferredBanks,
  } = req.body;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API Key missing");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const detailedPrompt = `
        Act as a professional financial advisor in India. A user is looking for a loan:
        - Type: ${loanType} | Amount: ₹${loanAmount} | Tenure: ${loanTenure}
        - Income: ₹${monthlyIncome} | Job: ${employmentType} | CIBIL: ${cibilScore}
        - Pref Banks: ${preferredBanks?.join(", ") || "None"}
        Provide 3 SPECIFIC loan recommendations in India.
        Return JSON array: [{ "bankName": "", "interestRate": "", "emi": "", "features": [], "approvalChance": "High/Med/Low" }]
        No markdown. Just JSON.
    `;
  const result = await model.generateContent(detailedPrompt);
  const response = await result.response;
  let text = response.text();
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  try {
    const recommendations = JSON.parse(text);
    res.json({ recommendations });
  } catch (parseError) {
    console.error("JSON Parse Error:", parseError);
    res.json({ recommendations: [], rawText: text });
  }
});
