import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_PROJECT_NAME || 'Minimalist'} - E-Commerce`,
  description: "A minimalist e-commerce experience",
  icons: {
    icon: [
      { url: '/lt-favicon.svg' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
