'use client';

import Header from '@/components/Header';

export default function CampaignPage() {
  return (
    <>
      <Header viewMode="grid" onViewModeChange={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Current Campaigns</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">Summer Sale</h2>
            <p className="text-gray-600 mb-4">Enjoy up to 30% off on selected summer essentials.</p>
            <div className="text-sm font-semibold text-gray-500">Valid until August 31, 2023</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">New Arrivals</h2>
            <p className="text-gray-600 mb-4">Discover our latest collection of minimalist products.</p>
            <div className="text-sm font-semibold text-gray-500">Shop now while supplies last</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">Free Shipping</h2>
            <p className="text-gray-600 mb-4">Free shipping on all orders over $50.</p>
            <div className="text-sm font-semibold text-gray-500">Limited time offer</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">Loyalty Program</h2>
            <p className="text-gray-600 mb-4">Join our loyalty program and earn points with every purchase.</p>
            <div className="text-sm font-semibold text-gray-500">Exclusive benefits for members</div>
          </div>
        </div>
      </main>
    </>
  );
} 