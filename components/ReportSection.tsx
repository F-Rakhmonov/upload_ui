import React from 'react';

interface ReportSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, children, className }) => {
  return (
    <section className={`py-3 ${className || ''}`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-2 border-b border-slate-300 pb-1">
        {title}
      </h3>
      <div className="space-y-1 text-slate-600">
        {children}
      </div>
    </section>
  );
};

export default ReportSection;