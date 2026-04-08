import { Ingredient, Meal, IngredientsResponse, MealsResponse, MealDetailResponse } from '@/types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/list.php?i=list`);
  if (!res.ok) throw new Error('Failed to fetch ingredients');
  const data: IngredientsResponse = await res.json();
  return data.meals || [];
}

export async function fetchMealsByIngredient(ingredient: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  if (!res.ok) throw new Error('Failed to fetch meals');
  const data: MealsResponse = await res.json();
  return data.meals || [];
}

export async function fetchMealsByName(name: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error('Failed to search meals');
  const data: MealsResponse = await res.json();
  return data.meals || [];
}

export async function fetchMealDetail(mealId: string): Promise<Meal | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);
  if (!res.ok) throw new Error('Failed to fetch meal detail');
  const data: MealDetailResponse = await res.json();
  return data.meals?.[0] || null;
}
