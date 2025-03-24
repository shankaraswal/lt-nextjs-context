'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isAuthenticated, toggleLoginModal } = useAuth();
  
  // Handle checkout click
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toggleLoginModal();
    } else {
      router.push('/checkout');
    }
  };
  
  return (
    <>
      <Header viewMode="grid" onViewModeChange={() => {}} />
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              href="/"
              className="inline-block bg-maroon-700 text-white px-6 py-3 rounded hover:bg-maroon-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="hidden md:grid md:grid-cols-5 border-b pb-3 mb-4 font-medium text-gray-500">
                    <div className="md:col-span-2">Product</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Total</div>
                  </div>
                  
                  <div className="space-y-6">
                    {cartItems.map(item => {
                      // Calculate discounted price
                      const price = item.price;
                      const discount = item.discountPercentage || 0;
                      const discountedPrice = price - (price * (discount / 100));
                      const itemTotal = discountedPrice * item.quantity;
                      
                      return (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 border-b pb-6">
                          <div className="md:col-span-2 flex">
                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
                              <img 
                                src={item.thumbnail} 
                                alt={item.title}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div>
                              <h3 className="text-base font-medium text-gray-800">{item.title}</h3>
                              <p className="text-sm text-gray-500">{item.brand}</p>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-sm text-maroon-600 hover:text-maroon-800 flex items-center mt-2"
                              >
                                <AiOutlineDelete size={16} className="mr-1" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="text-center">
                              <div className="font-medium">${discountedPrice.toFixed(2)}</div>
                              {discount > 0 && (
                                <div className="text-xs text-gray-500 line-through">${price.toFixed(2)}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="flex items-center border rounded">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <AiOutlineMinus size={16} />
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <AiOutlinePlus size={16} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-end">
                            <span className="font-semibold">${itemTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold">Estimated Total</span>
                    <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-maroon-700 text-white py-3 rounded font-medium hover:bg-maroon-800 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  <Link 
                    href="/"
                    className="block w-full text-center border border-gray-300 bg-white text-gray-700 py-3 rounded font-medium hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 