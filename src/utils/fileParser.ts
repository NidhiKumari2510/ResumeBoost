import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'pdf') {
    return extractFromPDF(file);
  } else if (ext === 'docx' || ext === 'doc') {
    return extractFromDocx(file);
  } else if (ext === 'txt') {
    return file.text();
  }

  throw new Error(`Unsupported file type: .${ext}. Please upload PDF, DOCX, DOC, or TXT files.`);
}

async function extractFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    pages.push(pageText);
  }

  return pages.join('\n\n');
}

async function extractFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export function validateFile(file: File): string | null {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowed = ['pdf', 'doc', 'docx', 'txt'];
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (!ext || !allowed.includes(ext)) {
    return 'Please upload a PDF, DOC, DOCX, or TXT file.';
  }

  if (file.size > maxSize) {
    return 'File size must be under 5MB.';
  }

  return null;
}
