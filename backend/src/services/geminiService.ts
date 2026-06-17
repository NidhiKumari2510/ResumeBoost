import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.5-flash",
];

export async function generateGeminiResponse(prompt: string) {
  let lastError: any;

  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const text = response.text?.trim();

      if (!text) {
        throw new Error(`${model} returned an empty response`);
      }

      return text;
    } catch (error: any) {
      lastError = error;

      console.error(`Gemini model failed: ${model}`, error);

      const status =
        error?.status ||
        error?.error?.code ||
        error?.cause?.status;

      if (status !== 503 && status !== 429) {
        break;
      }
    }
  }

  console.error("All Gemini models failed:", lastError);
  throw new Error("Failed to generate AI response");
}

export function parseGeminiJson<T>(raw: string): T {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    console.error("Invalid Gemini JSON response:", raw);
    throw new Error("Gemini returned invalid JSON");
  }
}