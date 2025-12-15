import React from 'react';
import Section from './Section';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  badge: string | null;
}

interface ProductListProps {
  products: Product[];
  user: { name: string; email: string; enrolledCourses: string[]; isAdmin?: boolean } | null;
  onOpenAuth: () => void;
  onPurchaseClick: (product: Product) => void;
  onOpenCourse: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onRestoreDefaults?: () => void;
  isLoading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  user, 
  onOpenAuth, 
  onPurchaseClick, 
  onOpenCourse,
  onViewDetails,
  onDeleteProduct,
  onRestoreDefaults,
  isLoading = false
}) => {
  return (
    <Section id="products" className="bg-gray-50 min-h-[500px]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Courses</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Choose from our selection of high-demand skills. Immediate access upon payment.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              user={user}
              onOpenAuth={onOpenAuth}
              onPurchaseClick={onPurchaseClick}
              onOpenCourse={onOpenCourse}
              onViewDetails={onViewDetails}
              onDelete={onDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
           <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
           </svg>
           <h3 className="text-lg font-medium text-gray-900 mb-1">No courses available yet</h3>
           <p className="text-gray-500 mb-6">Check back soon for new content.</p>
           
           {user?.isAdmin && onRestoreDefaults && (
             <button 
               onClick={onRestoreDefaults}
               className="bg-brand-green text-white font-bold py-2 px-6 rounded-full hover:bg-brand-dark transition-colors shadow-md"
             >
               Restore Default Courses
             </button>
           )}
        </div>
      )}
    </Section>
  );
};

export default ProductList;