import React from 'react';
import { CONTENT } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 pb-24 md:pb-12 text-center">
      <div className="container mx-auto px-4">
        <p className="mb-2 font-medium text-white">{CONTENT.footer.copyright}</p>
        <p className="text-sm">{CONTENT.footer.note}</p>
        <div className="mt-8 flex justify-center gap-4 text-xs">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;