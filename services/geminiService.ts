
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
  }

  async *sendMessage(message: string) {
    const responseStream = await this.chat.sendMessageStream({ message });
    for await (const chunk of responseStream) {
      const response = chunk as GenerateContentResponse;
      yield response.text;
    }
  }
}

export const geminiService = new GeminiService();
