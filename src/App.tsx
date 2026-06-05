import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ATSCheckerPage from './pages/ATSCheckerPage';
import OptimizerPage from './pages/OptimizerPage';
import BuilderPage from './pages/BuilderPage';
import InterviewPage from './pages/InterviewPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020817]">
        <Navbar />
        <main className="lg:pl-64 pt-14 lg:pt-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ats-checker" element={<ATSCheckerPage />} />
            <Route path="/optimizer" element={<OptimizerPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/interview" element={<InterviewPage />} />
          </Routes>
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#091430',
            color: '#e2e8f0',
            border: '1px solid rgba(34,211,238,0.15)',
            fontSize: '13px',
          },
          success: {
            iconTheme: { primary: '#22d3ee', secondary: '#020817' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#020817' },
          },
        }}
      />
    </BrowserRouter>
  );
}
