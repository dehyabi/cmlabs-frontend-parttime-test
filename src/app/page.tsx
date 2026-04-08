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
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Discover Ingredients
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse our collection of ingredients and find delicious recipes to cook
        </p>
      </div>
      <IngredientsList ingredients={ingredients} isLoading={isLoading} />
    </div>
  );
}
