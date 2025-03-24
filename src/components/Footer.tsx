import Link from 'next/link';

export default function Footer() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Minimalist';
  
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-maroon-100">About</h3>
            <p className="text-slate-400 text-sm">
              {projectName} is a modern e-commerce platform offering high-quality products with minimalist design principles.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-maroon-100">Categories</h3>
            <ul className="text-slate-400 text-sm space-y-2">
              <li><Link href="/" className="hover:text-maroon-200">Skincare</Link></li>
              <li><Link href="/" className="hover:text-maroon-200">Makeup</Link></li>
              <li><Link href="/" className="hover:text-maroon-200">Fragrances</Link></li>
              <li><Link href="/" className="hover:text-maroon-200">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-maroon-100">Information</h3>
            <ul className="text-slate-400 text-sm space-y-2">
              <li><Link href="/about" className="hover:text-maroon-200">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-maroon-200">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-maroon-200">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-maroon-200">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-maroon-100">Contact</h3>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>123 {projectName} St.</li>
              <li>New York, NY 10001</li>
              <li>support@{projectName.toLowerCase()}.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} {projectName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 