export interface UploadItem {
  id: string;
  label: string;
}

export interface SelectedFileMap {
  [key: string]: File | undefined;
}

export interface FileUploadCardProps {
  id: string;
  label: string;
  selectedFile?: File;
  previewUrl?: string;
  onFileChange: (id: string, file: File | null) => void;
}

export interface FileUploadScreenProps {
  initialUploadItems: UploadItem[];
  selectedFiles: SelectedFileMap;
  previewUrls: Record<string, string>;
  onFileChange: (id: string, file: File | null) => void;
  onNextStep: (data?: ChildFormData) => void; // Can be called without data from this screen
  allFilesUploaded: boolean;
}

export interface ChildFormData {
  childName: string;
  dob: string;
  gender: string;
  parentName: string;
  // Emotional Sphere
  q1_1: string; 
  q1_2: string; 
  q1_3: string; 
  q1_4: string; 
  // Social Interaction
  q2_1: string; 
  q2_2: string; 
  q2_3: string; 
  // Self-Regulation and Behavior
  q3_1: string; 
  q3_2: string; 
  q3_3: string; 
  // Self-Esteem and Confidence
  q4_1: string; 
  q4_2: string; 
  q4_3: string; 
  // General Questions
  generalEmotionalState: string;
  behavioralFeatures: string;
  strengthsWeaknesses: string;
  developmentConcerns: string;
  specialistConsultation: string;
  [key: string]: string; // For dynamic radio group handling
}

export interface ChildInfoFormScreenProps {
  onNextStep: (data: ChildFormData) => void; // Data is mandatory from this screen
  onPreviousStep: () => void;
}

export interface ReportScreenProps {
  childFormData: ChildFormData;
  onPreviousStep: () => void;
  // selectedFiles?: SelectedFileMap; // Optional: if report needs to display uploaded images
  // previewUrls?: Record<string, string>; // Optional: for image previews
}


export interface RadioOption {
  label: string;
  value: string;
}

export interface Question { // This type seems unused currently, might be for future dynamic form generation
  id: string;
  text: string;
  options: RadioOption[];
}

export interface ScaleItem {
    label: string;
    score: number;
    maxScore: number;
    filledColor?: string;
    emptyColor?: string;
}

export interface VisualProfileItem {
    label: string;
    value: number; // e.g., 7 out of 10
    total: number; // e.g., 10
    filledColor?: string;
    emptyColor?: string;
}
