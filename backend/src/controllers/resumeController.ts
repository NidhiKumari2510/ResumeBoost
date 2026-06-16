import { Request, Response } from "express";
import { generateGeminiResponse } from "../services/geminiService";

export const optimizeResume = async (
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


You are an expert Resume Writer and Career Coach.

Optimize the following resume according to the given job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide:

1. Improved Resume Content
2. Missing Skills
3. ATS Optimization Suggestions
4. Better Resume Summary
5. Improved Bullet Points
6. Final Recommendations

Make the resume more ATS-friendly and recruiter-friendly.
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
  message: "Failed to optimize resume",
});


}
};
