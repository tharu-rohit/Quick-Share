
import React from 'react';
import { CopyIcon, ShareMoreIcon } from './Icons';

interface ShareCardProps {
  shareData: {
    message: string;
    link: string;
  };
  onReset: () => void;
  onCopy: (text: string) => void;
}

export const ShareCard: React.FC<ShareCardProps> = ({ shareData, onReset, onCopy }) => {
  const fullTextToCopy = `${shareData.message}\n\n${shareData.link}`;
  
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold text-green-400 mb-2">Link Generated!</h2>
      <div className="w-full p-4 mb-4 bg-slate-900/50 border border-slate-700 rounded-lg">
        <p className="text-slate-300 italic mb-3">"{shareData.message}"</p>
        <a href={shareData.link} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cyan-400 break-all hover:underline">
          {shareData.link}
        </a>
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onCopy(fullTextToCopy)}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <CopyIcon className="w-5 h-5" />
          Copy
        </button>
        <button
          onClick={onReset}
          className="flex-1 bg-slate-600 hover:bg-slate-500 text-slate-100 font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ShareMoreIcon className="w-5 h-5" />
          Share More
        </button>
      </div>
    </div>
  );
};
