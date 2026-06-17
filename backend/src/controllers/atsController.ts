import { Request, Response } from "express";
import {
  generateGeminiResponse,
  parseGeminiJson,
} from "../services/geminiService";

export const analyzeATS = async (
  req: Request,
  res: Response
) => {
  try {
    const { resumeText, jobDescription } =
      req.body;

    const prompt = `
Analyze this resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
  "atsScore": 85,
  "keywordMatchPercentage": 75,
  "matchedKeywords": ["React"],
  "missingKeywords": ["Docker"],
  "strengths": ["Strong frontend skills"],
  "improvements": ["Add Docker experience"],
  "suggestions": [
    {
      "title": "Add Docker",
      "description": "Mention Docker projects",
      "priority": "high"
    }
  ],
  "overallFeedback": "Good match"
}

No markdown.
No explanation.
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
      message: "ATS analysis failed",
    });
  }
};