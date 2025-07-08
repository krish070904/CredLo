import { GoogleGenerativeAI } from "@google/generative-ai";
const chatWithGemini = async (req, res) => {
  const { message, history } = req.body;
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("Critical Error: GEMINI_API_KEY is missing.");
      return res.status(500).json({ message: "Server error: API Key missing" });
    }
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
    let userContext = "";
    if (req.user) {
      userContext = `
User Profile Context (Use this to personalize answers):
- Name: ${req.user.name}
- CIBIL Score: ${req.user.cibilScore} (Range: 300-900)
- Location: ${req.user.city}, ${req.user.state}
- Member Since: ${new Date(req.user.createdAt).toLocaleDateString()}
            `.trim();
    }
    console.log(
      `AI Chat Request [${req.user?.email || "Guest"}] (Model: gemini-2.5-flash): "${message.substring(0, 50)}..."`,
    );
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const systemPrompt = `You are CredLo AI, a professional financial assistant. 
${userContext}
Format your responses using strict Markdown. Use **Bold** for emphasis, ### Headings for sections, and bullet points for lists. Keep paragraphs short and concise. Avoid dense walls of text. Be precise and accurate. If asked about the CIBIL score, use the value provided in the context.`;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });
    const chat = model.startChat({
      history: history || [],
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini 2.5 Error:", error);
    const errorMessage = error.message.includes("404")
      ? `AI Model Error: ${error.message}`
      : "I'm having trouble thinking right now. Please try again in a moment.";
    res.status(500).json({ message: errorMessage });
  }
};
export { chatWithGemini };
