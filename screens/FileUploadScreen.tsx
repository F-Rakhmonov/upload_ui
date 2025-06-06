
import React from 'react';
import Alert from '../components/Alert';
import FileUploadCard from '../components/FileUploadCard';
import { ArrowRightIcon } from '../components/IconComponents';
import type { FileUploadScreenProps } from '../types';

const FileUploadScreen: React.FC<FileUploadScreenProps> = ({
  initialUploadItems,
  selectedFiles,
  previewUrls,
  onFileChange,
  onNextStep,
  allFilesUploaded,
}) => {

  const isImageFile = (file?: File): boolean => {
    if (!file) return false;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return !!fileExtension && ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Загрузите фотографии рисунков
        </h1>
        <Alert message="Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб" />
      </header>

      <main className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {initialUploadItems.map((item) => {
            const currentFile = selectedFiles[item.id];
            // Ensure previewUrl is only passed if it's for an image file type
            // Non-image files (like PDF) will be handled by FileUploadCard to show filename
            const canPreview = currentFile && isImageFile(currentFile);
            
            return (
              <FileUploadCard
                key={item.id}
                id={item.id}
                label={item.label}
                selectedFile={currentFile}
                previewUrl={canPreview ? previewUrls[item.id] : undefined}
                onFileChange={onFileChange}
              />
            );
          })}
        </div>
      </main>

      <footer className="flex justify-between items-center">
        <span className="text-sm text-slate-500">Шаг 1/3</span>
        <button
          className={`font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors duration-150
                        ${allFilesUploaded
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-slate-300 text-slate-700 cursor-not-allowed' // Adjusted disabled style
            }`}
          onClick={() => onNextStep()}
          disabled={!allFilesUploaded}
          aria-disabled={!allFilesUploaded}
        >
          Далее
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </footer>
    </>
  );
};

export default FileUploadScreen;
