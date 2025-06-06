import React from 'react';
import type { RadioOption } from '../types';

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, selectedValue, onChange, required, className }) => {
  return (
    <fieldset className={`space-y-2 ${className || ''}`}>
      <legend className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </legend>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(name, option.value)}
              required={required && options.indexOf(option) === 0} // Only require the first for fieldset validation
              className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-slate-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;