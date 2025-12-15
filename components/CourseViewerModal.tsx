import React from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
}

interface CourseViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const CourseViewerModal: React.FC<CourseViewerModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-4 bg-black/90">
      <div className="relative bg-white w-full h-full md:h-[90vh] md:w-[90vw] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-bold text-lg md:text-xl line-clamp-1">{product.name}</h2>
            <p className="text-gray-400 text-sm">Course Content</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 bg-black flex items-center justify-center relative group">
             {/* Fake Video Player */}
             <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white font-medium text-lg">Click to Start Lesson 1</p>
                <p className="text-gray-400 text-sm mt-2">Simulation Mode</p>
             </div>
          </div>

          {/* Sidebar / Playlist */}
          <div className="w-full md:w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="font-bold text-gray-800">Course Modules</h3>
              <p className="text-xs text-gray-500">0% Completed</p>
            </div>
            <div className="overflow-y-auto flex-1 p-2 space-y-2">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className={`p-3 rounded-lg flex gap-3 items-center cursor-pointer transition-colors ${i === 1 ? 'bg-brand-blue/50 border border-brand-blue' : 'hover:bg-white hover:shadow-sm'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 1 ? 'bg-brand-dark text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {i}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${i === 1 ? 'text-brand-dark' : 'text-gray-700'}`}>
                        Introduction to Module {i}
                      </p>
                      <p className="text-xs text-gray-400">12:3{i} mins</p>
                    </div>
                    {i === 1 && (
                      <div className="ml-auto">
                        <svg className="w-4 h-4 text-brand-dark" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                 </div>
               ))}
            </div>
            <div className="p-4 border-t border-gray-200 bg-white">
              <button className="w-full py-2 bg-gray-200 text-gray-700 font-bold rounded-lg text-sm hover:bg-gray-300">
                Download Resources (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewerModal;