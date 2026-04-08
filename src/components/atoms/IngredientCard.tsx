'use client';

import Link from 'next/link';

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

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      className="group block p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50
        hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:border-transparent
        transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient}
          flex items-center justify-center text-white font-bold text-lg shadow-lg
          group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          {displayName.charAt(0)}
        </div>
        <span className="text-gray-700 font-medium text-lg group-hover:text-gray-900 
          transition-colors duration-200">
          {displayName}
        </span>
      </div>
    </Link>
  );
}