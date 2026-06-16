import express from "express";
import { generateInterviewQuestions } from "../controllers/interviewController";

const router = express.Router();

router.post(
  "/generate",
  generateInterviewQuestions
);

export default router;