'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMealDetail } from '@/lib/api';
import { Meal } from '@/types';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';

export default function MealDetailPage() {
  const params = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMealDetail(params.id as string)
      .then(setMeal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!meal) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Meal not found</p>
        <Link href="/" className="text-emerald-600 hover:underline mt-4 inline-block">
          ← Back to Ingredients
        </Link>
      </div>
    );
  }

  const ingredients: string[] = [];
  const measures: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string | null | undefined;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string | null | undefined;
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient);
      measures.push(measure || '');
    }
  }

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
      >
        <span>←</span> Back to Ingredients
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={meal.strMealThumb || ''}
            alt={meal.strMeal}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
              {meal.strMeal}
            </h1>
            {meal.strArea && (
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                🌍 {meal.strArea}
              </span>
            )}
            {meal.strCategory && (
              <span className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium ml-2">
                🍽️ {meal.strCategory}
              </span>
            )}
          </div>

          {meal.strYoutube && (
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                title="Recipe Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {meal.strTags && (
            <div className="flex flex-wrap gap-2">
              {meal.strTags.split(',').map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>🥘</span> Ingredients
          </h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
            <ul className="space-y-3">
              {ingredients.map((ing, idx) => (
                <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700">{ing}</span>
                  <span className="text-gray-500 font-medium">{measures[idx]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>👨‍🍳</span> Instructions
          </h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {meal.strInstructions}
            </p>
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
              >
                View Original Recipe
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
