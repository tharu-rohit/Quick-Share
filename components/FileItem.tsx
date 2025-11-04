
import React from 'react';
import { formatBytes } from '../App';
import { FileIcon, ImageIcon, VideoIcon, AudioIcon, ArchiveIcon, CodeIcon, TrashIcon } from './Icons';

interface FileItemProps {
  file: File;
  onRemove: () => void;
}

const getFileIcon = (fileType: string): React.ReactElement => {
    if (fileType.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-purple-400" />;
    if (fileType.startsWith('video/')) return <VideoIcon className="w-5 h-5 text-red-400" />;
    if (fileType.startsWith('audio/')) return <AudioIcon className="w-5 h-5 text-orange-400" />;
    if (fileType.startsWith('application/zip') || fileType.startsWith('application/x-rar')) return <ArchiveIcon className="w-5 h-5 text-yellow-400" />;
    if (fileType.startsWith('application/json') || fileType.startsWith('text/html') || fileType.startsWith('text/css')) return <CodeIcon className="w-5 h-5 text-green-400" />;
    return <FileIcon className="w-5 h-5 text-slate-400" />;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
  return (
    <div className="flex items-center p-3 bg-slate-700/50 rounded-lg">
      <div className="flex-shrink-0">
        {getFileIcon(file.type)}
      </div>
      <div className="flex-1 min-w-0 ml-3">
        <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
        <p className="text-xs text-slate-400">{formatBytes(file.size)}</p>
      </div>
      <button onClick={onRemove} className="ml-3 p-1.5 rounded-full hover:bg-slate-600 transition-colors">
        <TrashIcon className="w-4 h-4 text-slate-400 hover:text-red-400" />
      </button>
    </div>
  );
};
