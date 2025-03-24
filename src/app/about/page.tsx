'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <>
      <Header viewMode="grid" onViewModeChange={() => {}} />
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p className="text-lg mb-4">
            Welcome to LaxiusTech, where simplicity meets elegance. We believe in the power of minimalist design and high-quality products that enhance your everyday life.
          </p>
          <p className="mb-4">
            Founded in 2020, our company has been dedicated to bringing you a curated selection of products that combine form and function. Our mission is to help you declutter and focus on what truly matters.
          </p>
          <p className="mb-4">
            Each product in our collection is carefully selected for its quality, sustainability, and timeless design. We work with responsible manufacturers who share our values of craftsmanship and environmental care.
          </p>
          <p>
            Thank you for choosing LaxiusTech. We're excited to be part of your journey towards a more intentional lifestyle.
          </p>
        </div>
      </main>
    </>
  );
} 