'use client';

import { useState, useMemo } from 'react';
import SearchInput from '@/components/atoms/SearchInput';
import EmptyState from '@/components/atoms/EmptyState';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { Ingredient } from '@/types';

interface IngredientsListProps {
  ingredients: Ingredient[];
  isLoading?: boolean;
}

export default function IngredientsList({ ingredients, isLoading }: IngredientsListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = useMemo(() => {
    if (!searchQuery.trim()) return ingredients;
    return ingredients.filter((ing) =>
      ing.strIngredient.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ingredients, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-20 z-10 backdrop-blur-xl bg-white/80 rounded-2xl p-4 shadow-lg border border-white/50">
        <SearchInput
          placeholder="🔍 Search ingredients..."
          onSearch={setSearchQuery}
          className="text-lg py-4 rounded-2xl border-2 border-violet-100 focus:border-violet-400 focus:ring-violet-200"
        />
      </div>

      {filteredIngredients.length === 0 ? (
        <EmptyState
          message={searchQuery ? 'No ingredients found matching your search' : 'No ingredients available'}
          icon={searchQuery ? '🔍' : '🥗'}
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <p className="text-gray-500 font-medium">
              {filteredIngredients.length} ingredients found
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredIngredients.map((ing) => (
              <div key={ing.strIngredient} className="transform transition-all duration-300 hover:scale-[1.02]">
                <a
                  href={`/ingredients/${encodeURIComponent(ing.strIngredient)}`}
                  className="block p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50
                    hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:border-transparent
                    transition-all duration-300"
                >
                  <span className="text-gray-700 font-medium text-lg">
                    {ing.strIngredient.charAt(0).toUpperCase() + ing.strIngredient.slice(1).toLowerCase()}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}