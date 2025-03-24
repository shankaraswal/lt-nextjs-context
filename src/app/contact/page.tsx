'use client';

import Header from '@/components/Header';

export default function ContactPage() {
  return (
    <>
      <Header viewMode="grid" onViewModeChange={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="How can we help you?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">support@minimalist.com</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 