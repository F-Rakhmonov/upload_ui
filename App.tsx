import React, { useState, useEffect } from 'react';
import FileUploadScreen from './screens/FileUploadScreen';
import ChildInfoFormScreen from './screens/ChildInfoFormScreen';
import ReportScreen from './screens/ReportScreen'; // Import ReportScreen
import type { SelectedFileMap, UploadItem, ChildFormData } from './types';

const initialUploadItems: UploadItem[] = [
  { id: 'house-tree-person', label: 'Дом, дерево, человек' },
  { id: 'nonexistent-animal', label: 'Несуществующее животное' },
  { id: 'self-portrait', label: 'Автопортрет' },
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileMap>({});
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [childFormData, setChildFormData] = useState<ChildFormData | null>(null);


   useEffect(() => {
    const newPreviewUrls: Record<string, string> = {};
    let changed = false;
    for (const id in selectedFiles) {
      const file = selectedFiles[id];
      if (file && !previewUrls[id]) {
        newPreviewUrls[id] = URL.createObjectURL(file);
        changed = true;
      } else if (file && previewUrls[id]) {
        newPreviewUrls[id] = previewUrls[id];
      }
    }

    for (const id in previewUrls) {
      if (!selectedFiles[id] || (selectedFiles[id] && selectedFiles[id].name !== Object.keys(previewUrls).find(key => previewUrls[key] === previewUrls[id]))) {
        // URL.revokeObjectURL(previewUrls[id]); // This was causing issues with re-renders
        changed = true;
      }
    }
    if (changed) {
        setPreviewUrls(currentPreviewUrls => {
            const updatedUrls = {...currentPreviewUrls};
            // Revoke URLs for files that are no longer selected or changed
            Object.keys(currentPreviewUrls).forEach(urlId => {
                if (!selectedFiles[urlId] || (selectedFiles[urlId] && currentPreviewUrls[urlId] !== newPreviewUrls[urlId])) {
                    URL.revokeObjectURL(currentPreviewUrls[urlId]);
                    delete updatedUrls[urlId];
                }
            });
             // Add new or updated URLs
            for (const id in newPreviewUrls) {
                updatedUrls[id] = newPreviewUrls[id];
            }
            return updatedUrls;
        });
    }

    // Enhanced cleanup function
    return () => {
      // Create a temporary copy of the URLs to iterate over,
      // as the state might change during the unmount process.
      const urlsToRevoke = { ...previewUrls };
      for (const id in urlsToRevoke) {
        URL.revokeObjectURL(urlsToRevoke[id]);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles]);


  const handleFileChange = (id: string, file: File | null) => {
    if (file === null) {
        setSelectedFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[id]; // This triggers useEffect to revoke URL
            return newFiles;
        });
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert('Файл слишком большой! Максимальный размер 5 МБ.');
      return;
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/gif']; // Added gif
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isAllowedImage = fileExtension && ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
    const isAllowedPdf = fileExtension === 'pdf';

    if (!allowedTypes.includes(file.type) && !isAllowedImage && !isAllowedPdf) {
      window.alert('Недопустимый формат файла! Разрешены: jpg, jpeg, png, gif, pdf.');
      return;
    }

    setSelectedFiles(prev => ({
      ...prev,
      [id]: file,
    }));
  };

  const allFilesUploaded = initialUploadItems.every(item => !!selectedFiles[item.id]);

  const handleNextStep = (data?: ChildFormData) => {
    if (currentStep === 1) {
      if (allFilesUploaded) {
        setCurrentStep(2);
      } else {
        alert('Пожалуйста, загрузите все три рисунка.');
      }
    } else if (currentStep === 2) {
      if (data) {
        setChildFormData(data);
        setCurrentStep(3);
      } else {
        // This case should ideally not happen if form validation is correct
        alert('Ошибка: данные формы отсутствуют.');
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };
  
  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
       <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200" style={{ zIndex: 1000 }}>
         <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
         ></div>
       </div>

      <div className="w-full max-w-4xl mt-10 mb-6"> {/* Adjusted margin for fixed progress bar */}
        {currentStep === 1 && (
          <FileUploadScreen
            initialUploadItems={initialUploadItems}
            selectedFiles={selectedFiles}
            previewUrls={previewUrls}
            onFileChange={handleFileChange}
            onNextStep={handleNextStep}
            allFilesUploaded={allFilesUploaded}
          />
        )}
        {currentStep === 2 && (
          <ChildInfoFormScreen
            onNextStep={handleNextStep} // Will pass formData
            onPreviousStep={handlePreviousStep}
          />
        )}
        {currentStep === 3 && childFormData && (
          <ReportScreen
            childFormData={childFormData}
            onPreviousStep={handlePreviousStep}
            // Pass selectedFiles if report needs them, e.g. for image display in report
            // selectedFiles={selectedFiles} 
            // previewUrls={previewUrls}
          />
        )}
      </div>
    </div>
  );
};

export default App;