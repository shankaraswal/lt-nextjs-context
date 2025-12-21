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
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { ref, inView } = useInView();

  const fetchProducts = async () => {
    try {
      setLoadingMore(true);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com';
      const skip = page * 12;
      const response = await fetch(`${apiBaseUrl}/products?limit=12&skip=${skip}`);
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

  // ProductSkeleton component for loading state
  const ProductSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => {
    const isGridView = viewMode === 'grid';

    return (
      <div className={`bg-white rounded-lg border border-gray-200 shadow-md animate-pulse ${isGridView ? 'w-full' : 'flex'
        }`}>
        <div className={`${isGridView ? 'h-72' : 'h-64 w-64'} bg-gray-200`}></div>

        <div className={`p-6 ${isGridView ? '' : 'flex-1'}`}>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="flex mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded-full mr-1"></div>
            ))}
          </div>
          {!isGridView && <div className="h-20 bg-gray-200 rounded mb-4"></div>}
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to sASWAL's</h1>
          <p className="text-gray-600">Discover our collection of minimalist products</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="hidden sm:block text-sm text-gray-500">
            {loading ? 'Loading products...' : (
              <span>
                <span className="font-medium text-slate-800">{products.length}</span> products loaded
                {loadingMore && <span className="ml-2 text-teal-600 font-medium">• Loading more...</span>}
              </span>
            )}
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

        <div className={`grid gap-y-8 gap-x-8 ${viewMode === 'grid'
          ? gridColumns === 3
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1 gap-y-12'
          }`}>
          {loading && !products.length ? (
            // Show skeletons while initially loading
            Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} viewMode={viewMode} />
            ))
          ) : (
            products.map((product, index) => (
              <ProductCard
                key={`product-${product.id}-${index}`}
                product={product}
                viewMode={viewMode}
              />
            ))
          )}
        </div>

        {loadingMore && (
          <div className="w-full my-12">
            <div className="h-4 bg-gray-200 overflow-hidden relative">
              {/* Main loading bar with animated width */}
              <div className="absolute top-0 left-0 h-full w-full bg-slate-800 animate-loading-bar origin-left"></div>

              {/* Shine effect that moves across the bar */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-slate-800 via-red-600 to-slate-800 opacity-90 animate-loading-shine"></div>
            </div>
            <div className="py-3 text-center text-sm font-medium text-gray-600">
              Loading more products...
            </div>
          </div>
        )}

        {!allProductsLoaded && <div ref={ref} className="h-10" />}

        {allProductsLoaded ? <Footer /> : <div className="h-16"></div>}
      </main>

      {/* Floating product count badge */}
      {!loading && products.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-3 py-2 rounded-full shadow-lg z-40 flex items-center">
          <span className="font-semibold">{products.length}</span>
          <span className="ml-1 text-sm">products</span>
          {loadingMore && (
            <span className="ml-2 h-2 w-2 bg-teal-400 rounded-full animate-pulse"></span>
          )}
        </div>
      )}
    </>
  );
}
