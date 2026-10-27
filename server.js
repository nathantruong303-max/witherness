\
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set. Add it to .env before using AI chat.");
}
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  try {
    const messages = req.body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Please send at least one message." });
    }

    // Only accept user/assistant text and cap history to limit accidental huge requests.
    const safeMessages = messages.slice(-20).map(m => {
      if (!m || !["user", "assistant"].includes(m.role) || typeof m.content !== "string") {
        throw new Error("Invalid message format.");
      }
      return { role: m.role, content: m.content.slice(0, 6000) };
    });
    if (safeMessages[safeMessages.length - 1].role !== "user") {
      return res.status(400).json({ error: "The last message must be from the user." });
    }
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "The server owner needs to configure OPENAI_API_KEY." });
    }

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: "You are Witherness AI, a helpful, friendly assistant inside the Witherness community website. Be clear, accurate, and respectful. If unsure, say so.",
      input: safeMessages
    });
    res.json({ reply: response.output_text || "I couldn't produce a text response. Please try again." });
  } catch (error) {
    console.error("Chat API error:", error?.message || error);
    res.status(500).json({ error: "AI request failed. Check the server logs and API configuration." });
  }
});

app.listen(port, () => console.log(`Witherness AI is running at http://localhost:${port}`));
