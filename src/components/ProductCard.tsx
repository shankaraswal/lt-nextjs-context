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
  
  // Pre-calculate rounded discount to ensure consistent server/client rendering
  const roundedDiscount = Math.round(discountPercentage);

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
          <div className="absolute top-6 left-6 z-10 bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
            {roundedDiscount}% OFF
          </div>
        )}
      </div>
      
      <div className={`p-6 ${isGridView ? '' : 'flex-1 flex flex-col justify-between'}`}>
        <div>
          <div className="uppercase tracking-wider text-xs font-medium text-gray-600 mb-2 bg-gray-100 w-fit px-2 py-1 rounded">
            {product.brand}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
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
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-900">
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
            className="bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded-md transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 