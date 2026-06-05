import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function getClient() {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured. Please add your VITE_GEMINI_API_KEY to the .env file.');
  }
  return new GoogleGenerativeAI(API_KEY);
}

async function generateContent(prompt: string): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function analyzeATS(resumeText: string, jobDescription: string) {
  const prompt = `You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume against the job description and return a JSON response.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "atsScore": <number 0-100>,
  "keywordMatchPercentage": <number 0-100>,
  "matchedKeywords": [<list of matched keywords, max 15>],
  "missingKeywords": [<list of missing important keywords, max 15>],
  "strengths": [<list of 4-5 resume strengths>],
  "improvements": [<list of 4-5 specific improvements>],
  "suggestions": [
    {"title": "<suggestion title>", "description": "<detailed suggestion>", "priority": "<high|medium|low>"}
  ],
  "overallFeedback": "<2-3 sentence overall assessment>"
}`;

  const text = await generateContent(prompt);
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

export async function optimizeResume(resumeText: string, jobDescription: string) {
  const prompt = `You are an expert resume writer and career coach. Optimize the following resume for the given job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "optimizedResume": "<full optimized resume text with improved bullet points, stronger language, ATS keywords>",
  "matchScore": <number 0-100>,
  "improvements": [
    {"section": "<section name>", "original": "<original text snippet>", "improved": "<improved version>", "reason": "<why this is better>"}
  ],
  "addedKeywords": [<list of ATS keywords added>],
  "summaryFeedback": "<2-3 sentences about what was improved overall>"
}`;

  const text = await generateContent(prompt);
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

export async function generateInterviewQuestions(resumeText: string, jobDescription: string) {
  const prompt = `You are an expert interview coach. Based on the resume and job description, generate comprehensive interview questions.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "technical": [
    {"question": "<question>", "sampleAnswer": "<detailed sample answer>", "difficulty": "<Easy|Medium|Hard>", "tip": "<interviewing tip>"}
  ],
  "hr": [
    {"question": "<question>", "sampleAnswer": "<detailed sample answer>", "difficulty": "<Easy|Medium|Hard>", "tip": "<interviewing tip>"}
  ],
  "behavioral": [
    {"question": "<question>", "sampleAnswer": "<detailed sample answer using STAR method>", "difficulty": "<Easy|Medium|Hard>", "tip": "<interviewing tip>"}
  ],
  "resumeBased": [
    {"question": "<question>", "sampleAnswer": "<detailed sample answer>", "difficulty": "<Easy|Medium|Hard>", "tip": "<interviewing tip>"}
  ],
  "roleSpecific": [
    {"question": "<question>", "sampleAnswer": "<detailed sample answer>", "difficulty": "<Easy|Medium|Hard>", "tip": "<interviewing tip>"}
  ]
}

Include at least 3 questions per category. Mix difficulty levels.`;

  const text = await generateContent(prompt);
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

export async function generateResumeSuggestions(resumeText: string) {
  const prompt = `You are an expert resume coach. Analyze this resume and provide actionable suggestions.

RESUME:
${resumeText}

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "overallScore": <number 0-100>,
  "suggestions": [
    {"category": "<category>", "suggestion": "<actionable suggestion>", "priority": "<high|medium|low>"}
  ],
  "summary": "<brief 2-sentence overall assessment>"
}`;

  const text = await generateContent(prompt);
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}
