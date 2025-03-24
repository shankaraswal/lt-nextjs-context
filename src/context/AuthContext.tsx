'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  setRegisterModalOpen: (open: boolean) => void;
  toggleLoginModal: () => void;
  toggleRegisterModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  
  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll accept any credentials
    // In a real app, this would validate against a backend
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUser = {
        id: '1',
        name: email.split('@')[0], // Use part of email as name
        email
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoginModalOpen(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll accept any registration
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setRegisterModalOpen(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const toggleLoginModal = () => {
    setLoginModalOpen(prev => !prev);
    if (registerModalOpen) setRegisterModalOpen(false);
  };
  
  const toggleRegisterModal = () => {
    setRegisterModalOpen(prev => !prev);
    if (loginModalOpen) setLoginModalOpen(false);
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loginModalOpen,
        registerModalOpen,
        setLoginModalOpen,
        setRegisterModalOpen,
        toggleLoginModal,
        toggleRegisterModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 