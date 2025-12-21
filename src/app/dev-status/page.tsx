'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineExclamationCircle, AiOutlineMinusCircle } from 'react-icons/ai';

interface FeatureStatus {
    name: string;
    status: 'completed' | 'in-progress' | 'planned' | 'not-started';
    description: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
}

const features: FeatureStatus[] = [
    // Core E-commerce
    { name: 'Product Catalog', status: 'completed', description: 'Display products with infinite scroll', priority: 'high', category: 'Core E-commerce' },
    { name: 'Shopping Cart', status: 'completed', description: 'Add/remove/update cart items', priority: 'high', category: 'Core E-commerce' },
    { name: 'Cart Persistence', status: 'completed', description: 'Save cart to localStorage', priority: 'high', category: 'Core E-commerce' },
    { name: 'Product Search', status: 'not-started', description: 'Search products by name/category', priority: 'high', category: 'Core E-commerce' },
    { name: 'Product Filters', status: 'not-started', description: 'Filter by price, category, brand', priority: 'medium', category: 'Core E-commerce' },
    { name: 'Product Details Page', status: 'not-started', description: 'Individual product pages with details', priority: 'high', category: 'Core E-commerce' },

    // Authentication
    { name: 'Mock Authentication', status: 'completed', description: 'Login/register with localStorage', priority: 'medium', category: 'Authentication' },
    { name: 'User Profile', status: 'in-progress', description: 'Basic user profile management', priority: 'medium', category: 'Authentication' },
    { name: 'Password Reset', status: 'not-started', description: 'Password recovery functionality', priority: 'low', category: 'Authentication' },
    { name: 'Social Login', status: 'planned', description: 'Google/Facebook login integration', priority: 'low', category: 'Authentication' },

    // UI/UX
    { name: 'Responsive Design', status: 'completed', description: 'Mobile-first responsive layout', priority: 'high', category: 'UI/UX' },
    { name: 'View Modes', status: 'completed', description: 'Grid/list view toggle', priority: 'medium', category: 'UI/UX' },
    { name: 'Loading States', status: 'completed', description: 'Skeleton loaders and progress bars', priority: 'medium', category: 'UI/UX' },
    { name: 'Dark Mode', status: 'not-started', description: 'Dark/light theme toggle', priority: 'low', category: 'UI/UX' },
    { name: 'Accessibility', status: 'in-progress', description: 'WCAG compliance improvements', priority: 'medium', category: 'UI/UX' },

    // Pages
    { name: 'Home Page', status: 'completed', description: 'Main product listing page', priority: 'high', category: 'Pages' },
    { name: 'Cart Page', status: 'completed', description: 'Dedicated cart management page', priority: 'high', category: 'Pages' },
    { name: 'Contact Page', status: 'completed', description: 'Contact form and information', priority: 'medium', category: 'Pages' },
    { name: 'Campaign Page', status: 'completed', description: 'Meme-inspired promotions', priority: 'low', category: 'Pages' },
    { name: 'About Page', status: 'not-started', description: 'Company information and story', priority: 'medium', category: 'Pages' },
    { name: 'Checkout Page', status: 'not-started', description: 'Order completion and payment', priority: 'high', category: 'Pages' },

    // Backend Integration
    { name: 'API Integration', status: 'completed', description: 'DummyJSON API for products', priority: 'high', category: 'Backend' },
    { name: 'Real Backend', status: 'planned', description: 'Custom API with database', priority: 'high', category: 'Backend' },
    { name: 'Payment Processing', status: 'planned', description: 'Stripe/PayPal integration', priority: 'high', category: 'Backend' },
    { name: 'Order Management', status: 'planned', description: 'Order tracking and history', priority: 'high', category: 'Backend' },
    { name: 'Inventory Management', status: 'planned', description: 'Stock tracking and updates', priority: 'medium', category: 'Backend' },

    // Performance & SEO
    { name: 'Image Optimization', status: 'completed', description: 'Next.js Image component usage', priority: 'medium', category: 'Performance' },
    { name: 'SEO Optimization', status: 'in-progress', description: 'Meta tags and structured data', priority: 'medium', category: 'Performance' },
    { name: 'Performance Monitoring', status: 'not-started', description: 'Analytics and performance tracking', priority: 'low', category: 'Performance' },
    { name: 'Caching Strategy', status: 'not-started', description: 'API and static content caching', priority: 'medium', category: 'Performance' },
];

const techStack = [
    { name: 'Next.js', version: '15.2.3', status: 'current', description: 'React framework with App Router' },
    { name: 'React', version: '19.0.0', status: 'current', description: 'UI library with latest features' },
    { name: 'TypeScript', version: '5.x', status: 'current', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', version: '4.x', status: 'current', description: 'Utility-first CSS framework' },
    { name: 'React Icons', version: '5.5.0', status: 'current', description: 'Icon library' },
    { name: 'React Intersection Observer', version: '9.16.0', status: 'current', description: 'Infinite scroll implementation' },
];

export default function DevStatusPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(features.map(f => f.category)))];
    const statuses = ['all', 'completed', 'in-progress', 'planned', 'not-started'];

    const filteredFeatures = features.filter(feature => {
        const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory;
        const statusMatch = selectedStatus === 'all' || feature.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <AiOutlineCheckCircle className="text-green-500" size={20} />;
            case 'in-progress':
                return <AiOutlineClockCircle className="text-blue-500" size={20} />;
            case 'planned':
                return <AiOutlineExclamationCircle className="text-yellow-500" size={20} />;
            case 'not-started':
                return <AiOutlineMinusCircle className="text-gray-400" size={20} />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'planned':
                return 'bg-yellow-100 text-yellow-800';
            case 'not-started':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-orange-100 text-orange-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const statusCounts = {
        completed: features.filter(f => f.status === 'completed').length,
        'in-progress': features.filter(f => f.status === 'in-progress').length,
        planned: features.filter(f => f.status === 'planned').length,
        'not-started': features.filter(f => f.status === 'not-started').length,
    };

    const completionPercentage = Math.round((statusCounts.completed / features.length) * 100);

    return (
        <>
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Development Status</h1>
                    <p className="text-gray-600">Track the progress of sASWAL's features and development milestones</p>
                </div>

                {/* Project Overview */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
                    <div className="prose text-gray-700 leading-relaxed">
                        <p className="mb-3">
                            <strong>sASWAL's </strong> is a modern e-commerce platform built with Next.js 15 and React 19,
                            showcasing the latest web development technologies and best practices.
                        </p>
                        <p className="mb-3">
                            The project demonstrates a complete shopping experience with product browsing, cart management,
                            user authentication, and responsive design. Built with TypeScript for type safety and Tailwind CSS
                            for rapid UI development.
                        </p>
                        <p className="mb-3">
                            Currently integrating with DummyJSON API for product data, with plans to implement a custom backend
                            for full e-commerce functionality including payment processing and order management.
                        </p>
                        <p>
                            The application features infinite scroll product loading, persistent cart state, mock authentication,
                            and a clean, minimalist design focused on user experience and performance optimization.
                        </p>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
                            <span className="text-2xl font-bold text-gray-900">{completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Completed</p>
                                <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
                            </div>
                            <AiOutlineCheckCircle className="text-green-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">In Progress</p>
                                <p className="text-2xl font-bold text-blue-600">{statusCounts['in-progress']}</p>
                            </div>
                            <AiOutlineClockCircle className="text-blue-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Planned</p>
                                <p className="text-2xl font-bold text-yellow-600">{statusCounts.planned + statusCounts['not-started']}</p>
                            </div>
                            <AiOutlineExclamationCircle className="text-yellow-500" size={32} />
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Tech Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {techStack.map((tech, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium text-gray-900">{tech.name}</h3>
                                    <span className="text-sm text-gray-500">v{tech.version}</span>
                                </div>
                                <p className="text-sm text-gray-600">{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>
                                        {status === 'all' ? 'All Statuses' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Features List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Features ({filteredFeatures.length})
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredFeatures.map((feature, index) => (
                            <div key={index} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {getStatusIcon(feature.status)}
                                            <h3 className="font-medium text-gray-900">{feature.name}</h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feature.status)}`}>
                                                {feature.status.replace('-', ' ')}
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feature.priority)}`}>
                                                {feature.priority}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {feature.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {filteredFeatures.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-gray-500">No features match the selected filters.</p>
                    </div>
                )}
            </main>
        </>
    );
}