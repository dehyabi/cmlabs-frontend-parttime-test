'use client';

import Link from 'next/link';
import Image from 'next/image';

interface IngredientCardProps {
  name: string;
}

// Color palettes for variety
const gradients = [
  'from-rose-400 to-pink-500',
  'from-orange-400 to-amber-500',
  'from-emerald-400 to-teal-500',
  'from-sky-400 to-blue-500',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-pink-500',
  'from-cyan-400 to-sky-500',
  'from-lime-400 to-green-500',
];

// Deterministic color based on ingredient name
function getGradient(name: string): string {
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export default function IngredientCard({ name }: IngredientCardProps) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const gradient = getGradient(name);
  const imageUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-Small.png`;

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      className="group block relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50
        hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:border-transparent
        transition-all duration-300 cursor-pointer"
    >
      {/* Small image in corner like a stamp/envelope */}
      <div className="absolute top-3 right-3 w-12 h-12 rounded-lg overflow-hidden shadow-md bg-gradient-to-br opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
        <Image
          src={imageUrl}
          alt={displayName}
          width={48}
          height={48}
          className="object-cover w-full h-full"
          unoptimized
        />
      </div>
      
      <div className="p-4 pr-16">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient}
            flex items-center justify-center text-white font-bold text-lg shadow-lg
            group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            {displayName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-gray-800 font-semibold text-base group-hover:text-gray-900 transition-colors duration-200">
              {displayName}
            </span>
          </div>
        </div>
      </div>
      
      {/* Colored accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
    </Link>
  );
}