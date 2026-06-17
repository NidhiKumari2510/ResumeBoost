import api from "./api";

export const analyzeATS  = async (
  resumeText: string,
  jobDescription: string
) => {
  const response = await api.post("/ats/analyze", {
    resumeText,
    jobDescription,
  });

  return response.data;
};