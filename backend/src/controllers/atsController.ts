import { Request, Response } from "express";
import { generateGeminiResponse } from "../services/geminiService";

export const analyzeATS = async (
req: Request,
res: Response
) => {
try {
const { resumeText, jobDescription } = req.body;


if (!resumeText || !jobDescription) {
  return res.status(400).json({
    success: false,
    message: "Resume text and job description are required",
  });
}

const prompt = `


You are an ATS (Applicant Tracking System) expert.

Analyze the following resume against the provided job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide:

1. ATS Score (out of 100)
2. Keyword Match Percentage
3. Missing Keywords
4. Strengths
5. Weaknesses
6. Suggestions for Improvement

Format the response clearly.
`;


const result = await generateGeminiResponse(prompt);

res.status(200).json({
  success: true,
  data: result,
});


} catch (error) {
console.error(error);


res.status(500).json({
  success: false,
  message: "Failed to analyze ATS score",
});


}
};
