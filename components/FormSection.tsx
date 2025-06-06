import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <section className="py-6 border-t border-slate-200 first-of-type:border-t-0 first-of-type:pt-0">
      <h3 className="text-xl font-semibold text-slate-700 mb-6">{title}</h3>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};

export default FormSection;