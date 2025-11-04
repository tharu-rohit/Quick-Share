
import React from 'react';
import { FileItem } from './FileItem';

interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  return (
    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
      {files.map((file, index) => (
        <FileItem
          key={index}
          file={file}
          onRemove={() => onRemoveFile(index)}
        />
      ))}
    </div>
  );
};
