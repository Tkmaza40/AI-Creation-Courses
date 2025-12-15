import React from 'react';
import Section from './Section';
import { CONTENT } from '../constants';

// Icons for value props
const ClockIcon = () => (
  <svg className="w-10 h-10 text-brand-green mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-10 h-10 text-brand-green mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-10 h-10 text-brand-green mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const WhyBuy: React.FC = () => {
  const icons = [<ClockIcon />, <GlobeIcon />, <BoltIcon />];

  return (
    <Section id="benefits">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900">{CONTENT.whyBuy.title}</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {CONTENT.whyBuy.points.map((point, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="bg-green-50 p-4 rounded-full mb-4">
              {icons[index]}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{point.title}</h3>
            <p className="text-gray-600">{point.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhyBuy;