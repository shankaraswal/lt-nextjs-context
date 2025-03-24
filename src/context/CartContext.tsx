'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  discountPercentage?: number;
  rating?: number;
  quantity?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);
  
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    // Open cart drawer when adding items
    setIsOpen(true);
  };
  
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    // If cart becomes empty after removing, clear localStorage
    if (cartItems.length === 1) {
      localStorage.removeItem('cart');
    }
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Calculate discounted price if applicable
      const price = item.price;
      const discount = item.discountPercentage || 0;
      const discountedPrice = price - (price * (discount / 100));
      
      return total + (discountedPrice * item.quantity);
    }, 0);
  };
  
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  const toggleCart = () => setIsOpen(prev => !prev);
  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal, 
        getCartCount,
        isOpen,
        toggleCart,
        closeCart,
        openCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 