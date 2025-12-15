import React from 'react';
import { CONTENT } from '../constants';

const Hero: React.FC = () => {
  const { hero } = CONTENT;

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-blue opacity-50 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-brand-dark uppercase bg-green-100 rounded-full">
            Nigeria's #1 AI Store
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            {hero.title} <br/>
            <span className="text-brand-green">{hero.subtitle}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            {hero.description}
          </p>
          <div className="flex justify-center">
            <button 
              onClick={scrollToProducts}
              className="px-8 py-4 text-lg font-bold text-white bg-brand-green rounded-full shadow-lg hover:bg-brand-dark transition-colors transform active:scale-95"
            >
              {hero.cta}
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Instant Access • Video & PDF Formats
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;