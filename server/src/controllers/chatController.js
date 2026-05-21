import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash";

export const sendMessage = async (req, res) => {
  try {
    const { message, taskContext } = req.body;
    const userId = req.user.id;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    // Build system instruction with task context
    let systemInstruction =
      `You are TaskHub AI Assistant, a helpful task management chatbot.

Your role:
- Help users with their tasks, productivity, and time management
- Provide concise, friendly, and actionable responses
- Format responses clearly with proper spacing and structure
- Use markdown formatting for better readability
- Include line breaks between different points

Response format:
- Keep responses concise (2-3 sentences max)
- Use bullet points or numbered lists when appropriate
- Add emoji to make responses friendly
- Always end with an encouraging note or question

Be conversational, supportive, and focused on productivity.`;

    if (taskContext) {
      systemInstruction += `\n\nUser's current tasks context:\n${JSON.stringify(taskContext)}`;
    }

    // Build message contents
    const contents = [
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // Send message to Gemini
    const response = await genAI.models.generateContent({
      model: MODEL,
      contents,
      config: {
        temperature: 0.7,
        systemInstruction,
      },
    });

    const botMessage = response.text;

    res.json({
      success: true,
      message: botMessage,
      userId,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Failed to process chat message",
      details: error.message,
    });
  }
};

export const getTaskSuggestions = async (req, res) => {
  try {
    const { tasks } = req.body;
    const userId = req.user.id;

    if (!tasks || tasks.length === 0) {
      return res
        .status(400)
        .json({ error: "No tasks provided for suggestions" });
    }

    const prompt = `Based on these tasks, provide 2-3 brief productivity suggestions (max 50 words each):\n\n${JSON.stringify(tasks, null, 2)}\n\nFormat as bullet points.`;

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await genAI.models.generateContent({
      model: MODEL,
      contents,
      config: {
        temperature: 0.7,
      },
    });

    const suggestions = response.text;

    res.json({
      success: true,
      suggestions,
      userId,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Suggestions error:", error);
    res.status(500).json({
      error: "Failed to generate suggestions",
      details: error.message,
    });
  }
};
