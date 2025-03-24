'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function ProductsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return (
    <>
      <Header viewMode="grid" onViewModeChange={() => {}} />
      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </main>
    </>
  );
} 