import React from 'react';
import WhatsAppButton from './WhatsAppButton';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  badge: string | null;
}

interface ProductCardProps {
  product: Product;
  user: { name: string; email: string; enrolledCourses: string[]; isAdmin?: boolean } | null;
  onOpenAuth: () => void;
  onPurchaseClick: (product: Product) => void;
  onOpenCourse: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  user, 
  onOpenAuth, 
  onPurchaseClick,
  onOpenCourse,
  onViewDetails,
  onDelete
}) => {
  const isEnrolled = user?.enrolledCourses.includes(product.id);
  const isAdmin = user?.isAdmin;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300 relative">
      <div 
        className="relative h-48 overflow-hidden group cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div className="absolute top-3 right-3 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
            {product.badge}
          </div>
        )}
        
        {isAdmin && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            className="absolute top-3 left-3 bg-red-600 text-white p-2 rounded-full shadow-md z-20 hover:bg-red-700 transition-colors"
            title="Delete Course"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {isEnrolled && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenCourse(product);
              }}
              className="bg-white text-black font-bold px-6 py-2 rounded-full transform scale-95 hover:scale-100 transition-transform"
            >
              Resume Course
            </button>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="text-lg font-bold text-gray-900 leading-tight cursor-pointer hover:text-brand-green transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
             <span className="text-gray-500 text-sm">Price</span>
             <span className="text-2xl font-bold text-brand-dark">{product.price}</span>
          </div>
          
          {isEnrolled ? (
            <button 
              onClick={() => onOpenCourse(product)}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Learning
            </button>
          ) : (
            <button 
              onClick={() => user ? onPurchaseClick(product) : onOpenAuth()}
              className="w-full bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-brand-dark transition-colors shadow-md transform active:scale-95"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;