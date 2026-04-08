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
    <div className="space-y-6">
      <SearchInput
        placeholder="Search meals..."
        onSearch={setSearchQuery}
      />

      {filteredMeals.length === 0 ? (
        <EmptyState
          message={searchQuery ? 'No meals found' : 'No meals available'}
          icon={searchQuery ? '🔍' : '🍽️'}
        />
      ) : (
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
      )}
    </div>
  );
}
