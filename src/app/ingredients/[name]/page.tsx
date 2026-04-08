'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMealsByIngredient, fetchMealsByName } from '@/lib/api';
import { Meal } from '@/types';
import MealsList from '@/components/molecules/MealsList';
import Link from 'next/link';

const gradientColors = [
  'from-rose-500 to-pink-600',
  'from-orange-500 to-amber-600',
  'from-emerald-500 to-teal-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-fuchsia-500 to-pink-600',
  'from-cyan-500 to-sky-600',
  'from-lime-500 to-green-600',
];

function getGradient(name: string): string {
  const index = name.charCodeAt(0) % gradientColors.length;
  return gradientColors[index];
}

export default function IngredientDetailPage() {
  const params = useParams();
  const ingredientName = decodeURIComponent(params.name as string);
  const gradient = getGradient(ingredientName);
  
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
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-600 hover:text-violet-600 hover:bg-white transition-all duration-300"
        >
          <span>←</span> Back to Ingredients
        </Link>
        
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-white/60 backdrop-blur-sm border border-white/50 shadow-xl">
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-600 font-medium text-sm mb-4">
              🥗 Ingredient
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold capitalize bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {ingredientName}
            </h1>
            <p className="text-gray-600 text-lg mt-4">
              Delicious meals featuring {ingredientName.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
      
      <MealsList meals={displayMeals} isLoading={displayLoading} />
    </div>
  );
}