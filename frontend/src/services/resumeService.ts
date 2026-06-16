import api from "./api";

export const optimizeResume = async (
  resumeText: string,
  jobDescription: string
) => {
  const response = await api.post("/resume/optimize", {
    resumeText,
    jobDescription,
  });

  return response.data.data;
};