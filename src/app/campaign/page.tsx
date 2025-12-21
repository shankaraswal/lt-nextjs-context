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
      next: { revalidate: 3600 } // Cache for 1 hour instead of no-store
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
    // Return fallback memes for build time
    return getFallbackMemes();
  }
}

// Fallback memes for when API is unavailable during build
function getFallbackMemes(): MemeTemplate[] {
  return [
    {
      id: '181913649',
      name: 'Drake Pointing',
      url: 'https://i.imgflip.com/30b1gx.jpg',
      width: 1200,
      height: 1200,
      box_count: 2,
      captions: 2
    },
    {
      id: '87743020',
      name: 'Two Buttons',
      url: 'https://i.imgflip.com/1g8my4.jpg',
      width: 600,
      height: 908,
      box_count: 3,
      captions: 3
    },
    {
      id: '112126428',
      name: 'Distracted Boyfriend',
      url: 'https://i.imgflip.com/1ur9b0.jpg',
      width: 1200,
      height: 800,
      box_count: 3,
      captions: 3
    },
    {
      id: '131087935',
      name: 'Running Away Balloon',
      url: 'https://i.imgflip.com/261o3j.jpg',
      width: 761,
      height: 1024,
      box_count: 5,
      captions: 5
    },
    {
      id: '247375501',
      name: 'Buff Doge vs. Cheems',
      url: 'https://i.imgflip.com/43a45p.jpg',
      width: 937,
      height: 720,
      box_count: 4,
      captions: 4
    },
    {
      id: '222403160',
      name: 'Bernie I Am Once Again Asking For Your Support',
      url: 'https://i.imgflip.com/3oevdk.jpg',
      width: 750,
      height: 750,
      box_count: 2,
      captions: 2
    },
    {
      id: '4087833',
      name: 'Waiting Skeleton',
      url: 'https://i.imgflip.com/2fm6x.jpg',
      width: 298,
      height: 403,
      box_count: 2,
      captions: 2
    },
    {
      id: '124822590',
      name: 'Left Exit 12 Off Ramp',
      url: 'https://i.imgflip.com/22bdq6.jpg',
      width: 804,
      height: 767,
      box_count: 3,
      captions: 3
    }
  ];
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