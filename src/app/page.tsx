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

      const enhancedProducts = data.products.map((product: Product) => ({
        ...product,
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
                <div className="bg-slate-200 rounded-lg overflow-hidden flex mr-2 border border-slate-300">
                  <button 
                    onClick={() => setGridColumns(3)}
                    className={`p-3 ${gridColumns === 3 
                      ? 'bg-red-800 text-white shadow-inner scale-105' 
                      : 'text-gray-700 hover:bg-slate-300'}`}
                    title="3 columns"
                  >
                    <BsGrid3X3 size={20} className={gridColumns === 3 ? 'text-yellow-100' : ''} />
                  </button>
                  <button 
                    onClick={() => setGridColumns(4)}
                    className={`p-3 ${gridColumns === 4 
                      ? 'bg-red-800 text-white shadow-inner scale-105' 
                      : 'text-gray-700 hover:bg-slate-300'}`}
                    title="4 columns"
                  >
                    <BsGridFill size={20} className={gridColumns === 4 ? 'text-yellow-100' : ''} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2 hidden sm:inline">View:</span>
              <div className="bg-slate-200 rounded-lg overflow-hidden flex border border-slate-300">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' 
                    ? 'bg-red-800 text-white shadow-inner scale-105' 
                    : 'text-gray-700 hover:bg-slate-300'}`}
                  title="Grid view"
                >
                  <BsGrid3X3Gap size={20} className={viewMode === 'grid' ? 'text-yellow-100' : ''} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' 
                    ? 'bg-red-800 text-white shadow-inner scale-105' 
                    : 'text-gray-700 hover:bg-slate-300'}`}
                  title="List view"
                >
                  <BsGrid size={20} className={viewMode === 'list' ? 'text-yellow-100' : ''} />
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

        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-700 animate-pulse rounded-full"></div>
            </div>
          </div>
        )}

        {!allProductsLoaded && <div ref={ref} className="h-10" />}
        
        {allProductsLoaded && <Footer />}
      </main>
    </>
  );
}
