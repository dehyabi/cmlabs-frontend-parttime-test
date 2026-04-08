'use client';

import { useState, useMemo } from 'react';
import SearchInput from '@/components/atoms/SearchInput';
import MealCard from '@/components/atoms/MealCard';
import EmptyState from '@/components/atoms/EmptyState';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { Meal } from '@/types';

interface MealsListProps {
  meals: Meal[];
  isLoading?: boolean;
}

export default function MealsList({ meals, isLoading }: MealsListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return meals;
    return meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [meals, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-20 z-10 backdrop-blur-xl bg-white/80 rounded-2xl p-4 shadow-lg border border-white/50">
        <SearchInput
          placeholder="🔍 Search meals..."
          onSearch={setSearchQuery}
          className="text-lg py-4 rounded-2xl border-2 border-rose-100 focus:border-rose-400 focus:ring-rose-200"
        />
      </div>

      {filteredMeals.length === 0 ? (
        <EmptyState
          message={searchQuery ? 'No meals found matching your search' : 'No meals available'}
          icon={searchQuery ? '🔍' : '🍽️'}
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <p className="text-gray-500 font-medium">
              {filteredMeals.length} recipes found
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                id={meal.idMeal}
                name={meal.strMeal}
                image={meal.strMealThumb || '/placeholder-meal.jpg'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}