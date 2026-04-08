'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMealDetail } from '@/lib/api';
import { Meal } from '@/types';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';

const badgeColors = [
  'bg-rose-100 text-rose-700',
  'bg-orange-100 text-orange-700',
  'bg-emerald-100 text-emerald-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-cyan-100 text-cyan-700',
  'bg-lime-100 text-lime-700',
];

function getBadgeColor(id: string): string {
  const index = parseInt(id) % badgeColors.length;
  return badgeColors[index];
}

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
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-gray-500 text-lg mb-4">Meal not found</p>
        <Link href="/" className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl hover:shadow-lg transition-all">
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

  const badgeColor = getBadgeColor(meal.idMeal);

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-600 hover:text-violet-600 hover:bg-white transition-all duration-300"
      >
        <span>←</span> Back to Ingredients
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
          <Image
            src={meal.strMealThumb || ''}
            alt={meal.strMeal}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              {meal.strMeal}
            </h1>
            <div className="flex flex-wrap gap-2">
              {meal.strArea && (
                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm ${badgeColor}`}>
                  🌍 {meal.strArea}
                </span>
              )}
              {meal.strCategory && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700">
                  🍽️ {meal.strCategory}
                </span>
              )}
            </div>
          </div>

          {meal.strYoutube && (
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
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
                  className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-gray-600 text-sm border border-white/50"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                🥘
              </span>
              Ingredients
            </h2>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <ul className="space-y-3">
                {ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 font-medium">{ing}</span>
                    <span className="text-gray-400 text-sm">{measures[idx]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white">
              👨‍🍳
            </span>
            Instructions
          </h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {meal.strInstructions}
            </p>
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-medium"
              >
                View Original Recipe →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}