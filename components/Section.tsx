import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id, dark = false }) => {
  return (
    <section id={id} className={`py-12 md:py-20 px-4 md:px-6 ${dark ? 'bg-gray-50' : 'bg-white'} ${className}`}>
      <div className="max-w-4xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
};

export default Section;