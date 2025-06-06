import React from 'react';
import type { VisualProfileItem } from '../types';

const VisualProfileItemDisplay: React.FC<VisualProfileItem> = ({
  label,
  value,
  total,
  filledColor = 'bg-sky-500',
  emptyColor = 'bg-slate-200',
}) => {
  return (
    <div className="flex items-center text-sm">
      <span className="text-slate-700 mr-2 w-36 sm:w-40 flex-shrink-0">{label}:</span>
      <div className="flex space-x-0.5">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-5 ${index < value ? filledColor : emptyColor} ${index === 0 ? 'rounded-l-sm' : ''} ${index === total -1 ? 'rounded-r-sm' : ''}`}
            aria-hidden="true"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default VisualProfileItemDisplay;