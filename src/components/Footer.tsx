import Link from 'next/link';

export default function Footer() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Minimalist';
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              {projectName} is a modern e-commerce platform offering high-quality products with minimalist design principles.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><Link href="/" className="hover:text-white">Skincare</Link></li>
              <li><Link href="/" className="hover:text-white">Makeup</Link></li>
              <li><Link href="/" className="hover:text-white">Fragrances</Link></li>
              <li><Link href="/" className="hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>123 {projectName} St.</li>
              <li>New York, NY 10001</li>
              <li>support@{projectName.toLowerCase()}.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} {projectName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 