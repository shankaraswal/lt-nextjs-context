import Header from '@/components/Header';
import Image from 'next/image';

// Type definitions
type MemeTemplate = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
};

type ImgflipResponse = {
  success: boolean;
  data: {
    memes: MemeTemplate[];
  };
};

// Server action to fetch meme templates from the Imgflip API
async function getMemeTemplates(): Promise<MemeTemplate[]> {
  console.log('Fetching meme templates on the server');
  
  try {
    const response = await fetch('https://api.imgflip.com/get_memes', { 
      cache: 'no-store' 
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: ImgflipResponse = await response.json();
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    // Instead of random selection which could cause hydration errors,
    // select the first 8 memes or use a stable selection algorithm
    const selectedMemes = data.data.memes.slice(0, 8);
    
    return selectedMemes;
  } catch (error) {
    console.error('Error fetching meme templates:', error);
    return [];
  }
}

// Example promotional content to pair with the memes
const promotionalContent = [
  {
    title: "Summer Flash Sale!",
    description: "50% off on all products. Limited time offer!",
    cta: "Shop Now"
  },
  {
    title: "New Collection Arrived",
    description: "Explore our latest products with free shipping",
    cta: "Discover"
  },
  {
    title: "Join Our Loyalty Program",
    description: "Get exclusive rewards and early access to sales",
    cta: "Sign Up"
  },
  {
    title: "Best Seller Alert",
    description: "Our most popular products are back in stock",
    cta: "View Products"
  },
  {
    title: "Clearance Sale",
    description: "Up to 70% off on selected items",
    cta: "See Offers"
  },
  {
    title: "Bundle & Save",
    description: "Buy any 3 items and get the 4th free",
    cta: "Create Bundle"
  },
  {
    title: "Weekend Special",
    description: "Use code WEEKEND20 for 20% off",
    cta: "Use Coupon"
  },
  {
    title: "Free Shipping Day",
    description: "No minimum purchase required. Today only!",
    cta: "Shop Now"
  }
];

export default async function CampaignPage() {
  // Fetch meme templates directly in the server component
  const memeTemplates = await getMemeTemplates();
  
  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Meme-Inspired Promotions</h1>
        <p className="text-gray-600 mb-8">Check out these special offers inspired by popular memes!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memeTemplates.map((meme, index) => {
            const promo = promotionalContent[index % promotionalContent.length];
            
            return (
              <div key={meme.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-48 sm:h-64">
                  <Image 
                    src={meme.url} 
                    alt={meme.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={index < 4}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{promo.title}</h2>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Inspired by: {meme.name}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                      {promo.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {memeTemplates.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Unable to load promotions</h2>
            <p className="text-gray-600">Please check back later for our special offers!</p>
          </div>
        )}
      </main>
    </>
  );
} 