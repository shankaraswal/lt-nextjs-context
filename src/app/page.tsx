'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useInView } from 'react-intersection-observer';
import { BsGrid3X3, BsGrid, BsGrid3X3Gap, BsGridFill } from 'react-icons/bs';

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchProducts = async () => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com';
      const skip = page * 20;
      const response = await fetch(`${apiBaseUrl}/products?limit=20&skip=${skip}`);
      const data = await response.json();
      
      if (data.products.length === 0) {
        setHasMore(false);
        return;
      }

      const enhancedProducts = data.products.map((product: Product) => ({
        ...product,
        discountPercentage: product.discountPercentage || Math.floor(Math.random() * 20) + 1,
        rating: product.rating || (Math.random() * 3 + 2).toFixed(1)
      }));

      setProducts(prev => [...prev, ...enhancedProducts]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchProducts();
    }
  }, [inView, hasMore, loading]);

  return (
    <>
      <Header viewMode={viewMode} onViewModeChange={setViewMode} />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Browse our collection of minimalist products</p>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="hidden sm:block text-sm text-gray-500">
            {products.length} products
          </div>
          <div className="flex gap-3 items-center">
            {viewMode === 'grid' && (
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2 hidden sm:inline">Columns:</span>
                <div className="bg-gray-100 rounded-lg overflow-hidden flex mr-2">
                  <button 
                    onClick={() => setGridColumns(3)}
                    className={`p-3 ${gridColumns === 3 ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                    title="3 columns"
                  >
                    <BsGrid3X3 size={18} />
                  </button>
                  <button 
                    onClick={() => setGridColumns(4)}
                    className={`p-3 ${gridColumns === 4 ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                    title="4 columns"
                  >
                    <BsGridFill size={18} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2 hidden sm:inline">View:</span>
              <div className="bg-gray-100 rounded-lg overflow-hidden flex">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}
                  title="Grid view"
                >
                  <BsGrid3X3Gap size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}
                  title="List view"
                >
                  <BsGrid size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`grid gap-y-8 gap-x-8 ${
          viewMode === 'grid' 
            ? gridColumns === 3 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1 gap-y-12'
        }`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        <div ref={ref} className="h-10" />
      </main>
    </>
  );
}
