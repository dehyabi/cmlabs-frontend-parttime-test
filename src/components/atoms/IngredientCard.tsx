'use client';

import Link from 'next/link';

interface IngredientCardProps {
  name: string;
}

export default function IngredientCard({ name }: IngredientCardProps) {
  // Capitalize first letter for display
  const displayName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      className="group block p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100
        hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-lg hover:-translate-y-0.5
        transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 
          flex items-center justify-center text-white font-semibold text-sm shadow-md
          group-hover:scale-110 transition-transform duration-200">
          {displayName.charAt(0)}
        </div>
        <span className="text-gray-700 font-medium group-hover:text-emerald-600 
          transition-colors duration-200">
          {displayName}
        </span>
      </div>
    </Link>
  );
}
