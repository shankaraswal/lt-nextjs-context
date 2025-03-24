'use client';

import { useCart } from '@/context/CartContext';

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
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const { addToCart } = useCart();
  const isGridView = viewMode === 'grid';
  
  // Calculate discounted price
  const originalPrice = parseFloat(product.price.toString());
  const discountPercentage = product.discountPercentage || 0;
  const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
  
  // Format prices
  const formattedOriginalPrice = `$${originalPrice.toFixed(2)}`;
  const formattedDiscountedPrice = `$${discountedPrice.toFixed(2)}`;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 mt-8 mb-4 overflow-hidden ${
      isGridView ? 'w-full' : 'flex'
    } hover:bg-slate-50`}>
      <div className={`relative pt-8 px-4 pb-4 ${isGridView ? 'h-72' : 'h-64 w-64'}`}>
        <div className="w-full h-full rounded-md overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        {discountPercentage > 0 && (
          <div className="absolute bottom-8 left-8 z-10 bg-maroon-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
            {Math.round(discountPercentage)}% OFF
          </div>
        )}
      </div>
      
      <div className={`p-6 ${isGridView ? '' : 'flex-1 flex flex-col justify-between'}`}>
        <div>
          <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
          <h3 className="text-base font-medium text-gray-800 mb-3">
            {product.title}
          </h3>
          
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(Number(product.rating || 0)) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
            ))}
            <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
          </div>
          
          {!isGridView && <p className="text-sm text-gray-600 mb-4">{product.description.slice(0, 100)}...</p>}
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-gray-900">
              {formattedDiscountedPrice}
            </span>
            {discountPercentage > 0 && (
              <span className="text-gray-400 text-sm line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-maroon-700 text-white py-2.5 px-4 rounded-md hover:bg-maroon-800 transition-colors text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 