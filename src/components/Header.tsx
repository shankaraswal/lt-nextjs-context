'use client';

import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { toggleCart, getCartCount } = useCart();
  const { isAuthenticated, user, toggleLoginModal } = useAuth();
  
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center py-6 px-4 md:px-6">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover:text-maroon-200 transition-colors"
          >
            LT-Shop
          </Link>
          
          {/* Navigation links - hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-maroon-200 transition-colors py-2">Home</Link>
            <Link href="/products" className="hover:text-maroon-200 transition-colors py-2">Products</Link>
            <Link href="/about" className="hover:text-maroon-200 transition-colors py-2">About</Link>
            <Link href="/campaign" className="hover:text-maroon-200 transition-colors py-2">Campaign</Link>
            <Link href="/contact" className="hover:text-maroon-200 transition-colors py-2">Contact</Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <button 
              className="p-2 rounded-full hover:bg-slate-800 transition-colors"
              title="Search"
            >
              <AiOutlineSearch size={22} />
            </button>
            
            {/* Cart */}
            <button 
              className="p-2 rounded-full hover:bg-slate-800 transition-colors relative"
              onClick={toggleCart}
              title="Cart"
            >
              <AiOutlineShoppingCart size={22} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-maroon-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
            
            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-800 transition-colors">
                  <span className="hidden sm:inline text-sm">{user?.name || 'User'}</span>
                  <AiOutlineUser size={22} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100">My Account</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100">Orders</Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100">Logout</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={toggleLoginModal}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors flex items-center space-x-2"
              >
                <span className="hidden sm:inline text-sm">Sign In</span>
                <AiOutlineUser size={22} />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 