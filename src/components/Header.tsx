import Link from 'next/link';
import { BsGrid, BsGridFill, BsListUl } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';

interface HeaderProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function Header({ viewMode, onViewModeChange }: HeaderProps) {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Minimalist';
  
  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            {projectName}
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/products" className="hover:text-gray-300">
              Products
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/campaign" className="hover:text-gray-300">
              Campaign
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-white hover:text-gray-300">
              <AiOutlineSearch size={20} />
            </button>
            <button className="text-white hover:text-gray-300">
              <AiOutlineShoppingCart size={20} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
} 