import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateGeminiResponse(
  prompt: string
) {
  try {
    console.log(
      "Gemini Key Loaded:",
      !!process.env.GEMINI_API_KEY
    );

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY || ""
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result =
      await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(
      "Gemini Error:",
      error
    );

    throw new Error(
      "AI service is currently busy. Please try again in a few moments."
    );
  }
}