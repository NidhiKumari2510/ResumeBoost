import express from "express";
import { analyzeATS } from "../controllers/atsController";

const router = express.Router();

router.post("/analyze", analyzeATS);

export default router;
