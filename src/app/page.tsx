'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useInView } from 'react-intersection-observer';
import { BsGrid3X3, BsGrid, BsGrid3X3Gap, BsGridFill } from 'react-icons/bs';
import Footer from '@/components/Footer';

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
  const [loadingMore, setLoadingMore] = useState(false);
  const { ref, inView } = useInView();

  const fetchProducts = async () => {
    try {
      setLoadingMore(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com';
      const skip = page * 20;
      const response = await fetch(`${apiBaseUrl}/products?limit=20&skip=${skip}`);
      const data = await response.json();
      
      if (data.products.length === 0) {
        setHasMore(false);
        return;
      }

      const enhancedProducts = data.products.map((product: Product, index: number) => ({
        ...product,
        id: page > 0 ? product.id + (page * 1000) : product.id,
        discountPercentage: product.discountPercentage || Math.floor(Math.random() * 20) + 1,
        rating: product.rating || (Math.random() * 3 + 2).toFixed(1)
      }));

      setTimeout(() => {
        setProducts(prev => [...prev, ...enhancedProducts]);
        setPage(prev => prev + 1);
        setLoadingMore(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoadingMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore) {
      fetchProducts();
    }
  }, [inView, hasMore, loading, loadingMore]);

  const allProductsLoaded = !hasMore && !loading && !loadingMore;

  return (
    <>
      <Header />
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
                <div className="bg-gray-100 rounded-lg overflow-hidden flex mr-2 border border-gray-200">
                  <button 
                    onClick={() => setGridColumns(3)}
                    className={`p-3 cursor-pointer ${gridColumns === 3 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    title="3 columns"
                  >
                    <BsGrid3X3 size={20} />
                  </button>
                  <button 
                    onClick={() => setGridColumns(4)}
                    className={`p-3 cursor-pointer ${gridColumns === 4 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    title="4 columns"
                  >
                    <BsGridFill size={20} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2 hidden sm:inline">View:</span>
              <div className="bg-gray-100 rounded-lg overflow-hidden flex border border-gray-200">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 cursor-pointer ${viewMode === 'grid' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  title="Grid view"
                >
                  <BsGrid3X3Gap size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 cursor-pointer ${viewMode === 'list' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  title="List view"
                >
                  <BsGrid size={20} />
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
          {products.map((product, index) => (
            <ProductCard
              key={`product-${product.id}-${index}`}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>

        {loadingMore && (
          <div className="fixed bottom-0 left-0 w-full h-2 bg-slate-200 z-30">
            <div className="h-full w-full bg-maroon-700 relative overflow-hidden">
              <div className="absolute inset-0 w-full">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-white opacity-20 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent -skew-x-20" />
              </div>
            </div>
          </div>
        )}

        {!allProductsLoaded && <div ref={ref} className="h-10" />}
        
        {allProductsLoaded && <Footer />}
      </main>
    </>
  );
}
