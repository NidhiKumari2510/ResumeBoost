import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { validateFile } from '../utils/fileParser';

interface FileUploadProps {
  onFile: (file: File) => void;
  label?: string;
  accepted?: string;
}

export default function FileUpload({ onFile, label = 'Upload Resume', accepted = '.pdf,.doc,.docx,.txt' }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    const err = validateFile(file);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setUploadedFile(file);
    onFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function remove() {
    setUploadedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {uploadedFile ? (
          <motion.div
            key="uploaded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{uploadedFile.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{(uploadedFile.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              onClick={remove}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`relative cursor-pointer border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 transition-all duration-200 ${
              dragOver
                ? 'border-cyan-400 bg-cyan-400/5'
                : 'border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/3'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              dragOver ? 'bg-cyan-400/20' : 'bg-slate-800'
            }`}>
              <Upload className={`w-6 h-6 transition-colors ${dragOver ? 'text-cyan-400' : 'text-slate-500'}`} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-300">{label}</p>
              <p className="text-xs text-slate-500 mt-1">Drag & drop or click to browse</p>
              <p className="text-xs text-slate-600 mt-0.5">PDF, DOCX, DOC, TXT — max 5MB</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <FileText className="w-3 h-3" />
              <span>Supports PDF, Word, and text files</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2 text-xs text-red-400"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </motion.div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accepted}
        onChange={onInputChange}
        className="hidden"
      />
    </div>
  );
}
