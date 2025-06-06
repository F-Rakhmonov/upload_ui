import React, { useRef } from 'react';
import { UploadIcon, ReloadIcon } from './IconComponents'; // Added ReloadIcon
import type { FileUploadCardProps } from '../types';

const FileUploadCard: React.FC<FileUploadCardProps> = ({ id, label, selectedFile, previewUrl, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(id, event.target.files[0]);
    } else if (!event.target.files || event.target.files.length === 0) {
      // This case might be triggered if user cancels file dialog after selecting a file before
      // However, typical behavior is that `onFileChange` is called with null by a separate 'remove' button
    }
    // Reset file input to allow re-uploading the same file
    if(event.target) {
      event.target.value = '';
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onFileChange(id, null); // Call onFileChange with null to remove
  }

  const isImage = selectedFile && ['image/jpeg', 'image/png', 'image/gif'].includes(selectedFile.type);


  return (
    <div 
      className="bg-white p-1 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center justify-between h-72 group text-center"
      onClick={handleClick}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role="button"
      aria-label={`Загрузить или изменить файл для ${label}`}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChangeInternal} 
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf"
        id={`file-input-${id}`}
      />
      
      <div className="relative w-full h-52 flex items-center justify-center mb-2 overflow-hidden rounded-t-lg">
        {previewUrl && isImage ? (
          <>
            <img src={previewUrl} alt={`Предпросмотр ${label}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ReloadIcon className="w-12 h-12 text-white" />
            </div>
          </>
        ) : selectedFile && !isImage ? (
             <div className="w-24 h-24 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-150">
                <span className="text-sm text-slate-700 p-2 break-all">{selectedFile.name}</span>
            </div>
        ) : (
          <div className="w-24 h-24 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-150">
            <UploadIcon className="w-12 h-12 text-sky-600" />
          </div>
        )}
      </div>
      
      <p className="text-base font-medium text-slate-700 px-2 mb-1 flex-grow flex items-center">{label}</p>
      
      {selectedFile && (
        <button 
          onClick={handleRemoveFile} 
          className="text-xs text-red-500 hover:text-red-700 mb-2 underline"
          aria-label={`Удалить файл ${selectedFile.name}`}
        >
          Удалить
        </button>
      )}
    </div>
  );
};

export default FileUploadCard;