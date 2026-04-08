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
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 via-amber-50 to-emerald-50">
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <a href="/" className="flex items-center gap-3 group">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🍳</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:to-amber-500 transition-all duration-500">
                    Recipe Explorer
                  </span>
                </a>
                <nav className="flex items-center gap-2">
                  <a
                    href="/"
                    className="px-5 py-2.5 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 font-medium"
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
          <footer className="border-t border-white/50 mt-16 py-8 text-center">
            <p className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent font-medium">
              Powered by TheMealDB API
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}