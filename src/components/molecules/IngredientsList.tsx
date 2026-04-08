'use client';

import { useState, useMemo } from 'react';
import SearchInput from '@/components/atoms/SearchInput';
import IngredientCard from '@/components/atoms/IngredientCard';
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
    <div className="space-y-6">
      <SearchInput
        placeholder="Search ingredients..."
        onSearch={setSearchQuery}
      />

      {filteredIngredients.length === 0 ? (
        <EmptyState
          message={searchQuery ? 'No ingredients found' : 'No ingredients available'}
          icon={searchQuery ? '🔍' : '🥗'}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIngredients.map((ing) => (
            <IngredientCard
              key={ing.strIngredient}
              name={ing.strIngredient}
            />
          ))}
        </div>
      )}
    </div>
  );
}
