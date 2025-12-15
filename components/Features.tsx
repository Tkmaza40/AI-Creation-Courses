import React from 'react';
import Section from './Section';
import { CONTENT } from '../constants';

// Simple Check Icon
const CheckIcon = () => (
  <svg className="w-6 h-6 text-brand-green flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Features: React.FC = () => {
  return (
    <Section id="features" dark>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What You'll Get</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          We've packed everything you need to start your AI journey into one accessible package.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {CONTENT.features.map((feature, index) => (
          <div key={index} className="flex items-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CheckIcon />
            <span className="text-lg font-medium text-gray-800">{feature}</span>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Features;