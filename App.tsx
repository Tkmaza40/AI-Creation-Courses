import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductList from './components/ProductList';
import WhyBuy from './components/WhyBuy';
import Section from './components/Section';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import PaymentModal from './components/PaymentModal';
import CourseViewerModal from './components/CourseViewerModal';
import AddProductModal from './components/AddProductModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { supabase } from './supabaseClient';

interface User {
  id: string; 
  name: string;
  email: string;
  phone?: string;
  enrolledCourses: string[];
  isAdmin?: boolean;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  badge: string | null;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProductForPurchase, setSelectedProductForPurchase] = useState<Product | null>(null);
  const [selectedProductForViewing, setSelectedProductForViewing] = useState<Product | null>(null);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // 1. Fetch Products from Supabase
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      
      if (error) {
        // Only fallback to static constants if there is a connection error/table missing
        console.warn("Supabase error (using static defaults):", error);
        setProducts(INITIAL_PRODUCTS);
      } else {
        // If successful, use the data (even if empty, so deletes persist)
        setProducts(data || []);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // 2. Fetch User Profile & Enrollments
  const fetchUserProfile = async (userId: string, email: string) => {
    try {
      // Get Profile Data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }

      // Get Enrollments
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('product_id')
        .eq('user_id', userId);

      const enrolledCourses = enrollmentData ? enrollmentData.map(e => e.product_id) : [];

      // Check for admin rights: Database flag OR specific email override
      const isAdmin = profileData?.is_admin || email === 'adamu9080@gmail.com';

      setUser({
        id: userId,
        email: email,
        name: profileData?.full_name || email.split('@')[0],
        phone: profileData?.phone || '',
        isAdmin: isAdmin,
        enrolledCourses: enrolledCourses
      });

    } catch (error) {
      console.error("Error building user profile:", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email!);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email!);
      } else {
        // user handled by logout logic mostly, but ensure consistency
        if (user?.id !== 'admin-mock-id') {
           setUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById('benefits');
    benefitsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handled automatically by onAuthStateChange, but kept for manual modal logic
  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };
  
  // Backdoor for admin if Supabase fails or isn't set up
  const handleMockAdminLogin = () => {
    setUser({
      id: 'admin-mock-id',
      email: 'adamu9080@gmail.com',
      name: 'Admin',
      phone: '',
      isAdmin: true,
      enrolledCourses: []
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsProfileModalOpen(false);
    setSelectedProductForViewing(null);
  };

  const handleUpdateUser = (updatedData: User) => {
    setUser(updatedData);
  };

  const handlePurchaseClick = (product: Product) => {
    setSelectedProductForPurchase(product);
  };

  const handleConfirmPurchase = async (productId: string) => {
    if (user) {
      // Optimistic update
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, productId]
      };
      setUser(updatedUser);

      // DB Insert
      try {
        if (user.id !== 'admin-mock-id') {
           await supabase.from('enrollments').insert({
             user_id: user.id,
             product_id: productId
           });
        }
      } catch (err) {
        console.error("Error saving enrollment:", err);
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!user?.isAdmin) return;
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;

    // Optimistic update
    setProducts(prev => prev.filter(p => p.id !== productId));

    try {
      if (user.id !== 'admin-mock-id') {
        const { error } = await supabase.from('products').delete().eq('id', productId);
        if (error) throw error;
      } else {
        alert("Deleted locally (Mock Admin mode)");
      }
    } catch (err: any) {
      console.error("Error deleting product:", err);
      alert('Failed to delete product from database: ' + err.message);
      fetchProducts(); // Revert
    }
  };
  
  const handleRestoreDefaults = async () => {
    if (!user?.isAdmin) return;
    if (!window.confirm("This will add the default example courses to your database. Continue?")) return;
    
    try {
      // Remove hardcoded IDs to let DB generate UUIDs
      const productsToInsert = INITIAL_PRODUCTS.map(({ id, ...rest }) => rest);
      
      const { error } = await supabase.from('products').insert(productsToInsert);
      if (error) throw error;
      
      alert("Default courses restored successfully!");
      fetchProducts();
    } catch (err: any) {
      console.error("Error restoring defaults:", err);
      alert('Failed to restore defaults: ' + err.message);
    }
  };

  const handleOpenCourse = (productOrId: Product | string) => {
    if (typeof productOrId === 'string') {
      const p = products.find(p => p.id === productOrId);
      if (p) setSelectedProductForViewing(p);
    } else {
      setSelectedProductForViewing(productOrId);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    scrollToProducts();
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProductForDetails(product);
  };

  return (
    <main className="min-h-screen flex flex-col w-full font-sans relative">
      {/* Navbar with Auth & Profile State */}
      <Navbar 
        user={user} 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onLogout={handleLogout}
        onScrollToProducts={scrollToProducts}
        onScrollToBenefits={scrollToBenefits}
        onOpenAddProduct={() => setIsAddProductModalOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onAdminLogin={handleMockAdminLogin}
      />

      {/* Profile Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
        onOpenCourse={handleOpenCourse}
        products={products}
      />

      {/* Add Product Modal (Admin Only) */}
      <AddProductModal 
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={!!selectedProductForPurchase}
        onClose={() => setSelectedProductForPurchase(null)}
        product={selectedProductForPurchase}
        onConfirmPurchase={handleConfirmPurchase}
        userEmail={user?.email || ''}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={!!selectedProductForDetails}
        onClose={() => setSelectedProductForDetails(null)}
        product={selectedProductForDetails}
        isEnrolled={!!user?.enrolledCourses.includes(selectedProductForDetails?.id || '')}
        onPurchase={handlePurchaseClick}
        onOpenCourse={handleOpenCourse}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Course Viewer */}
      <CourseViewerModal 
        isOpen={!!selectedProductForViewing}
        onClose={() => setSelectedProductForViewing(null)}
        product={selectedProductForViewing}
      />

      {/* Sections */}
      <Hero />
      <Features />
      <ProductList 
        products={products}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onPurchaseClick={handlePurchaseClick}
        onOpenCourse={handleOpenCourse}
        onViewDetails={handleViewDetails}
        onDeleteProduct={handleDeleteProduct}
        onRestoreDefaults={handleRestoreDefaults}
        isLoading={isLoadingProducts}
      />
      <WhyBuy />

      {/* Final Call to Action Section */}
      <Section className="bg-gray-900 text-white text-center rounded-none md:rounded-3xl md:my-10 md:mx-6 md:w-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {user ? `Ready to start learning, ${user.name}?` : "Need Help Choosing?"}
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto">
          {user 
            ? "Your account is active. Browse our courses and start your journey today."
            : "Chat with us directly to find the perfect course for your career goals."
          }
        </p>
        <WhatsAppButton 
          label={user ? "Browse Premium Courses" : "Chat with Support"}
          message={user ? "Hello, I am a registered member. I want to buy a course." : "Hello, I need help choosing a course."}
          variant="secondary"
          onClick={user ? scrollToProducts : undefined}
          className={user ? "!bg-brand-green !text-white !border-brand-green" : ""}
        />
      </Section>

      <Footer />
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-30 flex gap-2">
         <button 
           onClick={scrollToProducts}
           className="w-full py-3 bg-brand-green text-white font-bold rounded-full shadow-lg"
         >
           Shop All Courses
         </button>
      </div>
    </main>
  );
}

export default App;