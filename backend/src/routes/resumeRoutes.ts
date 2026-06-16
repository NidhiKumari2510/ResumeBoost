import express from "express";
import { optimizeResume } from "../controllers/resumeController";

const router = express.Router();

router.post("/optimize", optimizeResume);

export default router;
