import { Request, Response } from "express";
import {
  generateGeminiResponse,
  parseGeminiJson,
} from "../services/geminiService";

export const optimizeResume = async (req: Request, res: Response) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Optimize this resume.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
  "optimizedResume": "Full optimized resume text",
  "matchScore": 88,
  "improvements": [
    {
      "section": "Experience",
      "original": "Built websites",
      "improved": "Built scalable React applications",
      "reason": "More impactful wording"
    }
  ],
  "addedKeywords": [
    "React",
    "TypeScript",
    "Docker"
  ],
  "summaryFeedback":
    "Resume is highly optimized."
}

No markdown.
JSON only.
`;

    const result = await generateGeminiResponse(prompt);

    const parsed = parseGeminiJson(result);

    res.status(200).json(parsed);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Resume optimization failed",
    });
  }
};
