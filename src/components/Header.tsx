'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { toggleCart, getCartCount } = useCart();
  const { isAuthenticated, user, toggleLoginModal } = useAuth();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const getLinkClasses = (path: string) => {
    const baseClasses = "hover:text-maroon-200 transition-colors py-2";
    const activeClasses = "text-maroon-200 border-b-2 border-maroon-200";

    return `${baseClasses} ${isActive(path) ? activeClasses : ''}`;
  };

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center py-6 px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-maroon-200 transition-colors"
          >
            sASWAL&apos;s
          </Link>

          {/* Navigation links - hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={getLinkClasses('/')}>Home</Link>
            <Link href="/about" className={getLinkClasses('/about')}>About</Link>
            <Link href="/campaign" className={getLinkClasses('/campaign')}>Campaign</Link>
            <Link href="/contact" className={getLinkClasses('/contact')}>Contact</Link>
            <Link href="/dev-status" className={getLinkClasses('/dev-status')}>Dev Status</Link>
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
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-800 transition-colors"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <span className="hidden sm:inline text-sm">{user?.name || 'User'}</span>
                  <AiOutlineUser size={22} />
                </button>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
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