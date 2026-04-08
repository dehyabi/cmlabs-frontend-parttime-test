import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe Explorer',
  description: 'Discover delicious recipes by ingredient',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50">
          <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <a href="/" className="flex items-center gap-2 group">
                  <span className="text-2xl">🍳</span>
                  <span className="font-bold text-xl text-gray-800 group-hover:text-emerald-600 transition-colors">
                    Recipe Explorer
                  </span>
                </a>
                <nav className="flex items-center gap-4">
                  <a
                    href="/"
                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                  >
                    Ingredients
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-200/50 mt-16 py-8 text-center text-gray-500 text-sm">
            <p>Powered by TheMealDB API</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
