import { Request, Response } from "express";
import {
  generateGeminiResponse,
  parseGeminiJson,
} from "../services/geminiService";

export async function generateInterviewQuestions(
  req: Request,
  res: Response
) {
  try {
    const { resumeText, jobDescription } =
      req.body;

    const prompt = `
Generate interview questions.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
  "technical": [
    {
      "question": "",
      "sampleAnswer": "",
      "difficulty": "Medium",
      "tip": ""
    }
  ],
  "hr": [],
  "behavioral": [],
  "resumeBased": [],
  "roleSpecific": []
}

No markdown.
JSON only.
`;

    const result =
      await generateGeminiResponse(prompt);

    const parsed = parseGeminiJson(result);

    res.status(200).json(parsed);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Interview generation failed",
    });
  }
}