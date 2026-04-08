import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe Explorer',
  description: 'Discover delicious recipes by ingredient',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 via-amber-50 to-emerald-50">
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <a href="/" className="flex items-center gap-3 group">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                    <defs>
                      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7"/>
                        <stop offset="50%" stopColor="#ec4899"/>
                        <stop offset="100%" stopColor="#f97316"/>
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#logoGrad)"/>
                    <text x="50" y="68" fontSize="45" textAnchor="middle">🍳</text>
                  </svg>
                  <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:to-amber-500 transition-all duration-500">
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg viewBox="0 0 100 100" className="w-6 h-6">
                <defs>
                  <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7"/>
                    <stop offset="50%" stopColor="#ec4899"/>
                    <stop offset="100%" stopColor="#f97316"/>
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#footerGrad)"/>
                <text x="50" y="68" fontSize="45" textAnchor="middle">🍳</text>
              </svg>
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent font-medium">
                Recipe Explorer
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Powered by TheMealDB API
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}