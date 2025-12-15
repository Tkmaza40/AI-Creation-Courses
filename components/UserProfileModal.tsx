import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  enrolledCourses: string[];
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  badge: string | null;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
  onOpenCourse: (productId: string) => void;
  products: Product[];
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  onUpdateUser,
  onLogout,
  onOpenCourse,
  products
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state when user prop changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        // Update Supabase profile
        const { error } = await supabase
            .from('profiles')
            .update({ 
              full_name: name,
              phone: phone
            })
            .eq('id', user.id);

        if (error) throw error;

        onUpdateUser({ ...user, name, email, phone }); 
        setIsEditing(false);
    } catch (error: any) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const enrolledProducts = products.filter(p => user.enrolledCourses.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-brand-dark px-6 py-6 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/30">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">My Profile</h2>
              <p className="text-brand-light text-sm opacity-80">Member since 2024</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-xs bg-red-500/20 hover:bg-red-500 text-white px-3 py-1.5 rounded-full transition-colors border border-red-500/50 flex items-center gap-1"
          >
            Log Out
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto">
            {/* User Info Form */}
            <form onSubmit={handleSave} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Personal Details
                    </h3>
                    {!isEditing && (
                        <button 
                            type="button" 
                            onClick={() => setIsEditing(true)}
                            className="text-brand-green text-sm font-bold hover:underline"
                        >
                            Edit
                        </button>
                    )}
                </div>
                
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Full Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${isEditing ? 'border-brand-green bg-white shadow-sm' : 'border-transparent bg-transparent text-gray-800 font-medium'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Phone Number</label>
                        <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${isEditing ? 'border-brand-green bg-white shadow-sm' : 'border-transparent bg-transparent text-gray-800 font-medium'}`}
                            placeholder="080..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            disabled={true}
                            className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-600 font-medium cursor-not-allowed"
                            title="Email cannot be changed"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-4 flex gap-3 animate-fade-in">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="flex-1 bg-brand-green text-white font-bold py-2.5 rounded-lg hover:bg-brand-dark transition-colors shadow-md"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => {
                                setIsEditing(false);
                                setName(user.name);
                                setPhone(user.phone || '');
                                setEmail(user.email);
                            }}
                            className="px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>

            {/* Courses Section */}
            <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  My Courses
                </h3>
                
                {enrolledProducts.length > 0 ? (
                  <div className="space-y-3">
                    {enrolledProducts.map(product => (
                      <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
                          <p className="text-xs text-gray-500">Progress: 0%</p>
                        </div>
                        <button 
                          onClick={() => {
                            onClose();
                            onOpenCourse(product.id);
                          }}
                          className="bg-brand-dark text-white p-2 rounded-full hover:bg-brand-green transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300 group hover:border-brand-green/50 transition-colors">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300 shadow-sm group-hover:text-brand-green group-hover:scale-110 transition-all">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                      </div>
                      <p className="text-gray-600 mb-3 font-medium">You haven't enrolled in any courses yet.</p>
                      <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-200 text-brand-dark font-bold rounded-full hover:bg-brand-green hover:text-white hover:border-brand-green transition-all shadow-sm text-sm">
                          Browse Catalog
                      </button>
                  </div>
                )}
            </div>
        </div>

        {/* Close Icon (Top Right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;