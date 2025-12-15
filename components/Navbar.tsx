import React from 'react';

interface NavbarProps {
  user: { name: string; email: string; enrolledCourses: string[]; isAdmin?: boolean } | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  onScrollToProducts: () => void;
  onScrollToBenefits: () => void;
  onOpenAddProduct: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onOpenAuth, 
  onOpenProfile, 
  onLogout, 
  onScrollToProducts,
  onScrollToBenefits,
  onOpenAddProduct 
}) => {
  return (
    <nav className="w-full py-4 px-6 absolute top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl tracking-tight text-gray-900 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          AI<span className="text-brand-green">Course</span><span className="text-xs text-gray-400 font-normal ml-1">Store</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={onScrollToProducts} className="text-sm font-semibold text-gray-600 hover:text-brand-green transition-colors">
            Courses
          </button>
          <button onClick={onScrollToBenefits} className="text-sm font-semibold text-gray-600 hover:text-brand-green transition-colors">
            Benefits
          </button>
          
          <div className="h-4 w-px bg-gray-300 mx-2"></div>

          {user ? (
            <div className="flex items-center gap-4 animate-fade-in">
               {user.isAdmin && (
                 <button 
                   onClick={onOpenAddProduct}
                   className="flex items-center gap-1 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-all"
                 >
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                   </svg>
                   Add Product
                 </button>
               )}

               <button 
                 onClick={onOpenProfile}
                 className="flex items-center gap-2 group hover:opacity-80 transition-opacity focus:outline-none"
                 title="View Profile"
               >
                   <div className="w-8 h-8 bg-brand-light text-brand-dark rounded-full flex items-center justify-center font-bold text-xs border border-brand-green/30 group-hover:bg-brand-green group-hover:text-white transition-colors">
                     {user.name.charAt(0).toUpperCase()}
                   </div>
                   <span className="text-sm font-medium text-gray-900 group-hover:text-brand-green transition-colors">
                     {user.name}
                   </span>
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={onOpenAuth}
                className="text-sm font-bold text-gray-700 hover:text-brand-green transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={onOpenAuth}
                className="px-5 py-2 text-sm font-bold text-white bg-brand-green rounded-full shadow hover:bg-brand-dark transition-all transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden flex items-center gap-3">
           {user ? (
             <div className="flex items-center gap-2">
                {user.isAdmin && (
                 <button 
                   onClick={onOpenAddProduct}
                   className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center"
                 >
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                   </svg>
                 </button>
               )}
               <button 
                 onClick={onOpenProfile}
                 className="w-8 h-8 bg-brand-light text-brand-dark rounded-full flex items-center justify-center font-bold text-xs border border-brand-green/30 active:scale-95 transition-transform"
               >
                 {user.name.charAt(0).toUpperCase()}
               </button>
             </div>
           ) : (
             <button 
               onClick={onOpenAuth} 
               className="text-sm font-bold text-brand-dark bg-gray-100 px-4 py-2 rounded-full"
             >
               Login
             </button>
           )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;