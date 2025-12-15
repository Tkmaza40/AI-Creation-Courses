import React from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  badge: string | null;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isEnrolled: boolean;
  onPurchase: (product: Product) => void;
  onOpenCourse: (product: Product) => void;
  user: any;
  onOpenAuth: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  isEnrolled,
  onPurchase,
  onOpenCourse,
  user,
  onOpenAuth
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
        >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
           <img 
             src={product.image} 
             alt={product.name} 
             className="w-full h-full object-cover"
           />
           {product.badge && (
             <div className="absolute top-4 left-4 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
               {product.badge}
             </div>
           )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{product.name}</h2>
                <p className="text-2xl font-bold text-brand-green">{product.price}</p>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
            </p>

            <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">What you'll learn</h3>
                <ul className="space-y-2">
                    {[
                        "Comprehensive step-by-step curriculum",
                        "Real-world practical projects",
                        "Lifetime access to course materials",
                        "Certificate of completion"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                             <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                             </svg>
                             {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto">
                {isEnrolled ? (
                   <button 
                     onClick={() => {
                        onClose();
                        onOpenCourse(product);
                     }}
                     className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                   >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                     Resume Learning
                   </button>
                ) : (
                   <button 
                     onClick={() => {
                        if(user) {
                            onClose();
                            onPurchase(product);
                        } else {
                            onOpenAuth();
                        }
                     }}
                     className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors shadow-lg transform active:scale-95"
                   >
                     Buy Now for {product.price}
                   </button>
                )}
                <p className="text-center text-xs text-gray-400 mt-3">
                    {isEnrolled ? "You own this course" : "30-day money-back guarantee"}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;