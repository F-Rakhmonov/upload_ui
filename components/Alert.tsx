
import React from 'react';
import { ExclamationCircleIconSolid } from './IconComponents'; // Using Solid version

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg relative flex items-center shadow-sm" role="alert">
      <ExclamationCircleIconSolid className="w-5 h-5 mr-3 flex-shrink-0 text-red-500" />
      <span className="block sm:inline text-sm">{message}</span>
    </div>
  );
};

export default Alert;
