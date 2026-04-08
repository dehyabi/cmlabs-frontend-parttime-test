'use client';

import { useEffect, useState } from 'react';
import { fetchIngredients } from '@/lib/api';
import { Ingredient } from '@/types';
import IngredientsList from '@/components/molecules/IngredientsList';

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIngredients()
      .then(setIngredients)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-6 py-12">
        <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-600 font-medium text-sm mb-4">
          ✨ Explore Culinary Delights
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
            Discover
          </span>
          <br />
          <span className="text-gray-800">Ingredients</span>
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
          Browse our collection of ingredients and find delicious recipes to cook for your next meal
        </p>
      </div>
      <IngredientsList ingredients={ingredients} isLoading={isLoading} />
    </div>
  );
}