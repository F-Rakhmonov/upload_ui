import React from 'react';
import type { ScaleItem } from '../types';

const ScaleItemDisplay: React.FC<ScaleItem> = ({
  label,
  score,
  maxScore,
  filledColor = 'bg-green-500',
  emptyColor = 'bg-slate-200',
}) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-700 mr-2 min-w-[180px]">{label}:</span>
      <div className="flex items-center">
        <span className="mr-3 text-slate-600 font-medium whitespace-nowrap">
          {score} | {maxScore}
        </span>
        <div className="flex space-x-1">
          {Array.from({ length: maxScore }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-sm ${index < score ? filledColor : emptyColor}`}
              aria-hidden="true"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScaleItemDisplay;