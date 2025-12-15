import React from 'react';
import Section from './Section';
import { CONTENT } from '../constants';

const ProductOverview: React.FC = () => {
  const { overview } = CONTENT;

  return (
    <Section id="overview">
      <div className="bg-brand-blue rounded-3xl p-8 md:p-12 text-center md:text-left shadow-inner">
        <div className="md:flex md:items-center md:gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
             <h2 className="text-3xl font-bold text-gray-900 mb-6">{overview.title}</h2>
             <p className="text-lg text-gray-700 leading-relaxed mb-6">
               {overview.description}
             </p>
             <div className="space-y-4">
               <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-400">
                 <p className="text-sm font-bold text-gray-500 uppercase mb-1">The Problem</p>
                 <p className="text-gray-800">{overview.problem}</p>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-brand-green">
                 <p className="text-sm font-bold text-gray-500 uppercase mb-1">Our Solution</p>
                 <p className="text-gray-800">{overview.solution}</p>
               </div>
             </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <img 
               src="https://picsum.photos/500/400" 
               alt="Student learning AI" 
               className="rounded-2xl shadow-xl w-full max-w-sm object-cover"
             />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductOverview;