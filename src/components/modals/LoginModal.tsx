'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { IoClose } from 'react-icons/io5';

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, login, toggleRegisterModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        throw new Error('Login failed');
      }
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setLoginModalOpen(false);
    }
  };

  // Switch to register modal
  const handleRegisterClick = () => {
    setLoginModalOpen(false);
    toggleRegisterModal();
  };

  if (!loginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay background with 60% opacity */}
      <div className="fixed inset-0 bg-black opacity-60" onClick={handleOverlayClick}></div>

      {/* Modal content - not affected by opacity */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden z-10">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
            <button
              onClick={() => setLoginModalOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-maroon-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-maroon-700 text-white py-2 px-4 rounded-md hover:bg-maroon-800 transition-colors font-medium disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={handleRegisterClick}
                className="text-maroon-600 hover:underline font-medium"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 