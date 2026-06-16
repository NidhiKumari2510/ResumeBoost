import { Request, Response } from "express";
import { generateGeminiResponse } from "../services/geminiService";

export async function generateInterviewQuestions(
  req: Request,
  res: Response
) {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
You are an expert interview coach.

Resume:
${resumeText}

Job Description:
${jobDescription}

Generate:
1. Technical Questions
2. HR Questions
3. Behavioral Questions

Give detailed answers.
`;

    const response = await generateGeminiResponse(
      prompt
    );

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
    });
  }
}