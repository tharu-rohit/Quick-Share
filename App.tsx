
import React, { useState, useCallback } from 'react';
import { FileDropzone } from './components/FileDropzone';
import { FileList } from './components/FileList';
import { ShareCard } from './components/ShareCard';
import { Toast } from './components/Toast';
import { generateShareMessage } from './services/geminiService';
import { LogoIcon } from './components/Icons';

type ShareData = {
  message: string;
  link: string;
};

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleFilesSelected = (selectedFiles: FileList) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(selectedFiles)]);
    setShareData(null);
    setError(null);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleGenerateLink = useCallback(async () => {
    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const fileNames = files.map(f => f.name);
      const message = await generateShareMessage(fileNames);
      const randomId = Math.random().toString(36).substring(2, 10);
      setShareData({
        message,
        link: `https://qshare.ai/d/${randomId}`,
      });
      setFiles([]);
    } catch (e) {
      console.error(e);
      setError("Failed to generate message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [files]);

  const handleReset = () => {
    setFiles([]);
    setShareData(null);
    setError(null);
    setIsLoading(false);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
      
      <main className="w-full max-w-lg mx-auto z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <LogoIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl font-bold tracking-tight text-slate-50">Quick Share AI</h1>
          </div>
          <p className="text-slate-400">Upload files and get an AI-crafted share message.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-slate-950/50 p-6 transition-all duration-300">
          {shareData ? (
            <ShareCard
              shareData={shareData}
              onReset={handleReset}
              onCopy={handleCopyToClipboard}
            />
          ) : (
            <>
              <FileDropzone onFilesSelected={handleFilesSelected} />
              {error && <p className="text-red-400 text-center text-sm mt-4">{error}</p>}
              
              {files.length > 0 && (
                <div className="mt-6">
                  <FileList files={files} onRemoveFile={handleRemoveFile} />
                  <div className="mt-6 pt-4 border-t border-slate-700 text-right text-sm text-slate-400">
                    Total Files: <span className="font-semibold text-slate-200">{files.length}</span>, 
                    Total Size: <span className="font-semibold text-slate-200">{formatBytes(totalSize)}</span>
                  </div>
                  <button
                    onClick={handleGenerateLink}
                    disabled={isLoading}
                    className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-700 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      'Generate Share Link'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Toast message="Copied to clipboard!" show={showToast} />
      
      <footer className="text-center text-slate-500 text-sm py-8 z-10">
        Powered by Gemini
      </footer>
    </div>
  );
};

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default App;
