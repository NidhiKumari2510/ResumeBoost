# 🚀 ResumeBoost AI

ResumeBoost AI is a full-stack AI-powered career assistant designed to help students and job seekers improve their resumes, analyze ATS compatibility, and prepare for interviews with personalized AI-generated insights.

Built using React, TypeScript, Node.js, Express.js, MongoDB Atlas, JWT Authentication, and Google's Gemini AI, the platform provides an intuitive experience for resume enhancement, interview preparation, and career growth.

---

## 🌟 Features

### 🔐 Authentication & User Management

* User Registration & Login
* JWT-based Authentication
* Password Hashing using bcryptjs
* Persistent User Sessions
* Protected Routes
* Logout Functionality

### 📊 ATS Score Checker

* Upload Resume (PDF/DOCX/TXT)
* Paste Job Description
* Analyze resume compatibility with job requirements
* View ATS score and keyword matching insights
* Receive AI-generated improvement suggestions

### 📝 AI Resume Optimizer

* Tailor resumes according to specific job descriptions
* Improve resume bullet points
* Enhance action verbs and professional language
* Generate ATS-friendly recommendations
* View optimized resume output

### 🎯 AI Interview Preparation

* Generate personalized interview questions
* Technical Questions
* HR Questions
* Behavioral Questions
* Resume-Based Questions
* Role-Specific Questions
* AI-generated sample answers

### 📄 Resume Builder

* Create resumes using structured sections
* Personal Information
* Education
* Skills
* Projects
* Experience
* Certifications
* Achievements
* Live Preview Support

### 👤 User Dashboard

* Personalized User Experience
* Authentication State Management
* User Profile Information
* Secure Session Handling

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* React Router DOM
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### AI Integration

* Google Gemini AI

### Deployment

* Vercel (Frontend)
* Render (Backend)

---


## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd ResumeBoost
```

---

## 📦 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 📦 Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---


## 🎯 Future Improvements

* Resume History Storage
* ATS Report History
* Interview Question History
* Resume Version Tracking
* Export Resume as PDF
* AI Career Recommendations
* Job Match Percentage Analysis
* Mock Interview Simulator
* Email Notifications
* OAuth Authentication (Google/GitHub)


