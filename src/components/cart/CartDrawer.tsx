'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { IoClose } from 'react-icons/io5';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';
import Link from 'next/link';

export default function CartDrawer() {
  const { cartItems, isOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated, toggleLoginModal } = useAuth();
  // Add client-side only state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true once component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle checkout click
  const handleCheckout = () => {
    if (!isAuthenticated) {
      closeCart();
      toggleLoginModal();
    }
  };

  // Pre-calculate any values that might cause hydration errors
  const cartItemCount = isMounted ? getCartCount() : 0;
  const cartTotalAmount = isMounted ? getCartTotal().toFixed(2) : "0.00";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={closeCart}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
      )}
      
      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-5">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {isMounted ? `Your Cart (${cartItemCount})` : 'Your Cart'}
            </h2>
            <button 
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <IoClose size={24} />
            </button>
          </div>
          
          {!isMounted || cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button 
                onClick={closeCart}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto py-4 space-y-4">
                {cartItems.map(item => {
                  // Calculate discounted price
                  const price = item.price;
                  const discount = item.discountPercentage || 0;
                  // Pre-calculate to avoid hydration mismatch
                  const discountedPrice = price - (price * (discount / 100));
                  const itemTotal = discountedPrice * item.quantity;
                  // Format to ensure consistency
                  const formattedItemTotal = itemTotal.toFixed(2);
                  const formattedOriginalTotal = (price * item.quantity).toFixed(2);
                  
                  return (
                    <div key={item.id} className="flex border-b border-gray-100 pb-4">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <AiOutlineDelete size={18} />
                          </button>
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-2">{item.brand}</div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            >
                              <AiOutlineMinus size={14} />
                            </button>
                            <span className="px-2 py-1 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            >
                              <AiOutlinePlus size={14} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-semibold">${formattedItemTotal}</div>
                            {discount > 0 && (
                              <div className="text-xs text-gray-500 line-through">
                                ${formattedOriginalTotal}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotalAmount}</span>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {isAuthenticated ? (
                    <Link 
                      href="/checkout"
                      className="w-full bg-maroon-700 text-white py-3 rounded text-center font-medium hover:bg-maroon-800 transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                  ) : (
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-maroon-700 text-white py-3 rounded text-center font-medium hover:bg-maroon-800 transition-colors"
                    >
                      Sign in to Checkout
                    </button>
                  )}
                  
                  <button 
                    onClick={closeCart}
                    className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded text-center font-medium hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
} 