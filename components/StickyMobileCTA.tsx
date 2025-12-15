import React from 'react';
import WhatsAppButton from './WhatsAppButton';

const StickyMobileCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50">
      <WhatsAppButton label="Order Now" fullWidth size="lg" />
    </div>
  );
};

export default StickyMobileCTA;