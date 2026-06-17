import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import atsRoutes from "./routes/atsRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import interviewRoutes from "./routes/interviewRoutes";


connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/ats", atsRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/interview", interviewRoutes);

app.get("/", (_, res) => {
  res.send("ResumeBoost Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
