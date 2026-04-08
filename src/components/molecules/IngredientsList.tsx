'use client';

import { useState, useMemo } from 'react';
import SearchInput from '@/components/atoms/SearchInput';
import IngredientCard from '@/components/atoms/IngredientCard';
import EmptyState from '@/components/atoms/EmptyState';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { Ingredient } from '@/types';
import { groupIngredientsByCategory, getIngredientCategory } from '@/lib/categories';

interface IngredientsListProps {
  ingredients: Ingredient[];
  isLoading?: boolean;
}

export default function IngredientsList({ ingredients, isLoading }: IngredientsListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const { filteredIngredients, groupedIngredients, isSearching } = useMemo(() => {
    const filtered = searchQuery.trim()
      ? ingredients.filter((ing) =>
          ing.strIngredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : ingredients;
    
    const grouped = groupIngredientsByCategory(filtered);
    
    return {
      filteredIngredients: filtered,
      groupedIngredients: grouped,
      isSearching: searchQuery.trim().length > 0,
    };
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
      ) : isSearching ? (
        <>
          <div className="flex items-center justify-between px-2">
            <p className="text-gray-500 font-medium">
              {filteredIngredients.length} ingredients found
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredIngredients.map((ing) => (
              <IngredientCard
                key={ing.strIngredient}
                name={ing.strIngredient}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {Object.entries(groupedIngredients).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <span className="text-2xl">{getIngredientCategory(items[0]?.strIngredient || '').emoji}</span>
                <h2 className="text-xl font-bold text-gray-800">{category}</h2>
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-sm text-gray-500">
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((ing) => (
                  <IngredientCard
                    key={ing.strIngredient}
                    name={ing.strIngredient}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}