'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMealsByIngredient, fetchMealsByName } from '@/lib/api';
import { Meal } from '@/types';
import MealsList from '@/components/molecules/MealsList';
import Link from 'next/link';

export default function IngredientDetailPage() {
  const params = useParams();
  const ingredientName = decodeURIComponent(params.name as string);
  
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchMeals, setSearchMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMealsByIngredient(ingredientName)
      .then(setMeals)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [ingredientName]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchMeals([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await fetchMealsByName(query);
      setSearchMeals(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const displayMeals = searchMeals.length > 0 ? searchMeals : meals;
  const displayLoading = searchMeals.length > 0 ? isSearching : isLoading;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <span>←</span> Back to Ingredients
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 capitalize">
          {ingredientName} Recipes
        </h1>
        <p className="text-gray-600 text-lg">
          Delicious meals featuring {ingredientName}
        </p>
      </div>
      <MealsList meals={displayMeals} isLoading={displayLoading} />
    </div>
  );
}
