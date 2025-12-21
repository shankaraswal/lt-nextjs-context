# sASWAL's - Minimalist E-Commerce Platform

A modern, responsive e-commerce web application built with Next.js 15, featuring a clean minimalist design and smooth user experience. This project serves as a proof of concept for a full-featured online shopping platform.

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC)

## 🚀 Features

### ✅ Completed Features
- **Product Catalog** - Browse products with infinite scroll loading
- **Shopping Cart** - Full cart functionality with add/remove/update quantities
- **User Authentication** - Mock login/register system with localStorage persistence
- **Responsive Design** - Mobile-first approach with seamless cross-device experience
- **View Modes** - Toggle between grid (3/4 columns) and list view
- **Loading States** - Skeleton loaders and animated progress bars
- **Cart Persistence** - Cart items saved to localStorage
- **Modal System** - Login and registration modals
- **Contact Form** - Contact page with form and company information
- **Campaign Page** - Creative meme-inspired promotions using Imgflip API
- **About Page** - Company information and brand story
- **Checkout Page** - Complete checkout form with order summary
- **Image Optimization** - Next.js Image component with proper domain configuration
- **Code Quality** - All ESLint errors resolved, TypeScript compliant
- **Build Optimization** - Clean production builds without warnings

### 🔄 In Progress
- **User Profile Management** - Basic profile editing and management
- **SEO Optimization** - Meta tags and structured data implementation
- **Accessibility Improvements** - WCAG compliance enhancements

### 📋 Planned Features
- **Product Search & Filters** - Search by name, filter by category, price, brand
- **Product Details Pages** - Individual product pages with detailed information
- **Real Backend Integration** - Custom API with database
- **Order Management** - Order tracking and history
- **Payment Processing** - Stripe/PayPal integration
- **Dark Mode** - Theme toggle functionality
- **Performance Monitoring** - Analytics and performance tracking

## 🚀 Recent Improvements

### Build Quality & Performance
- ✅ **All ESLint errors resolved** - Fixed unescaped entities, unused variables, and dependency warnings
- ✅ **Image optimization complete** - Migrated all `<img>` tags to Next.js `<Image />` components
- ✅ **Clean production builds** - Zero warnings or errors in build process
- ✅ **TypeScript compliance** - Full type safety across the application
- ✅ **Performance optimized** - Proper image domains configured, lazy loading implemented

### New Pages & Features
- ✅ **About page completed** - Company information and brand story
- ✅ **Checkout page completed** - Full checkout form with order summary
- ✅ **Enhanced cart functionality** - Improved cart drawer and cart page
- ✅ **Better error handling** - Proper error states and user feedback

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.2.3](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/)
- **State Management**: React Context API (AuthContext, CartContext)
- **Icons**: [React Icons 5.5.0](https://react-icons.github.io/react-icons/)
- **Animations**: [React Intersection Observer 9.16.0](https://github.com/thebuilder/react-intersection-observer)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Development**: Turbopack for faster builds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lt-nextjs-context
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
NEXT_PUBLIC_PROJECT_NAME=sASWAL's
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page with company information
│   ├── campaign/          # Meme-inspired promotions
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process with order summary
│   ├── contact/           # Contact form page
│   ├── dev-status/        # Development status dashboard
│   ├── orders/            # Orders page (placeholder)
│   ├── account/           # Account page (placeholder)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page with product catalog
├── components/            # Reusable React components
│   ├── cart/              # Cart-related components
│   ├── modals/            # Modal components (Login/Register)
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation header
│   └── ProductCard.tsx    # Product display component
└── context/               # React Context providers
    ├── AuthContext.tsx    # Authentication state management
    └── CartContext.tsx    # Shopping cart state management
```

## 🎯 Key Pages

- **Home** (`/`) - Main product catalog with infinite scroll
- **Cart** (`/cart`) - Shopping cart management and checkout initiation
- **Contact** (`/contact`) - Contact form and company information
- **Campaign** (`/campaign`) - Creative promotional content with memes
- **About** (`/about`) - Company information and brand story
- **Checkout** (`/checkout`) - Complete checkout process with order summary
- **Dev Status** (`/dev-status`) - Development progress dashboard

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Functional components with React Hooks

## 📊 Development Status

Visit `/dev-status` in the application to see a comprehensive dashboard of:
- Feature completion progress
- Tech stack information
- Development roadmap
- Priority levels for upcoming features

Current completion: **~75%** of planned features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Integration

Currently using [DummyJSON](https://dummyjson.com/) for product data. The application is designed to easily switch to a custom backend API.

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Other Platforms

This Next.js application can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [DummyJSON](https://dummyjson.com/) for providing mock e-commerce data
- [Imgflip API](https://imgflip.com/api) for meme templates in campaigns

---

**Note**: This is a proof of concept project. For production use, implement proper authentication, payment processing, and backend integration.
