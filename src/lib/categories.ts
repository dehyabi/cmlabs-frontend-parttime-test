// Ingredient categories based on common names
const categoryMap: Record<string, string[]> = {
  'Meat & Poultry': [
    'chicken', 'beef', 'pork', 'bacon', 'turkey', 'lamb', 'duck', 'goose',
    'venison', 'rabbit', 'veal', 'ham', 'sausage', 'prosciutto', 'salami',
    'pepperoni', 'chorizo', 'brisket', 'fillet', 'mince', 'steak'
  ],
  'Seafood': [
    'salmon', 'tuna', 'cod', 'shrimp', 'prawn', 'crab', 'lobster', 'mussel',
    'clam', 'oyster', 'squid', 'octopus', 'fish', 'sardine', 'anchovy',
    'tilapia', 'haddock', 'halibut', 'trout', 'sea bass', 'scallop'
  ],
  'Vegetables': [
    'asparagus', 'aubergine', 'tomato', 'tomatoes', 'onion', 'garlic', 'pepper',
    'carrot', 'celery', 'broccoli', 'cauliflower', 'spinach', 'lettuce',
    'cabbage', 'kale', 'zucchini', 'courgette', 'cucumber', 'eggplant',
    'potato', 'potatoes', 'mushroom', 'corn', 'peas', 'beans', 'leek',
    'pumpkin', 'squash', 'artichoke', 'beetroot', 'radish', 'turnip'
  ],
  'Fruits': [
    'avocado', 'apple', 'banana', 'orange', 'lemon', 'lime', 'strawberry',
    'blueberry', 'raspberry', 'mango', 'pineapple', 'peach', 'pear', 'grape',
    'watermelon', 'cantaloupe', 'kiwi', 'plum', 'cherry', 'apricot', 'fig',
    'pomegranate', 'coconut', 'cranberry', 'blackberry', 'grapefruit'
  ],
  'Dairy & Eggs': [
    'milk', 'cheese', 'butter', 'cream', 'yogurt', 'yoghurt', 'egg', 'eggs',
    'mozzarella', 'parmesan', 'cheddar', 'feta', 'ricotta', 'goat cheese',
    'cream cheese', 'cottage cheese', 'sour cream', 'crème fraîche', 'brie',
    'camembert', 'gouda', 'blue cheese', 'paneer', 'mascarpone'
  ],
  'Herbs & Spices': [
    'basil', 'parsley', 'cilantro', 'mint', 'rosemary', 'thyme', 'oregano',
    'sage', 'dill', 'chive', 'chives', 'tarragon', 'bay leaf', 'bay leaves',
    'cumin', 'paprika', 'turmeric', 'cinnamon', 'nutmeg', 'ginger', 'cardamom',
    'cloves', 'coriander', 'cumin', 'curry', 'masala', 'saffron', 'vanilla',
    'peppercorn', 'chili', 'chilli', 'cayenne', 'allspice', 'star anise'
  ],
  'Grains & Pasta': [
    'rice', 'pasta', 'spaghetti', 'penne', 'linguine', 'fettuccine', 'noodle',
    'bread', 'flour', 'oat', 'oats', 'quinoa', 'couscous', 'barley', 'wheat',
    'semolina', 'polenta', 'tortilla', 'noodles', 'macaroni', 'rigatoni',
    'orzo', 'lasagna', 'ravioli', 'gnocchi', 'bulgur', 'farro'
  ],
  'Condiments & Sauces': [
    'vinegar', 'soy sauce', 'ketchup', 'mustard', 'mayonnaise', 'mayo',
    'worcestershire', 'hot sauce', 'salsa', 'pesto', 'hummus', 'tahini',
    'honey', 'maple syrup', 'molasses', 'ketchup', 'bbq', 'teriyaki',
    'oyster sauce', 'fish sauce', 'sriracha', 'tabasco', 'mirin'
  ],
  'Oils & Fats': [
    'olive oil', 'vegetable oil', 'coconut oil', 'sesame oil', 'oil',
    'lard', 'shortening', 'ghee', 'margarine'
  ],
  'Nuts & Seeds': [
    'almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'hazelnut', 'peanut',
    'sesame', 'sunflower', 'pumpkin seed', 'chia', 'flax', 'pine nut',
    'macadamia', 'brazil nut', 'pecan', 'chestnut'
  ],
  'Legumes': [
    'chickpea', 'lentil', 'kidney bean', 'black bean', 'beans', 'peas',
    'soybean', 'edamame', 'lentils', 'dal'
  ]
};

const categoryEmojis: Record<string, string> = {
  'Meat & Poultry': '🥩',
  'Seafood': '🦐',
  'Vegetables': '🥬',
  'Fruits': '🍎',
  'Dairy & Eggs': '🧀',
  'Herbs & Spices': '🌿',
  'Grains & Pasta': '🍝',
  'Condiments & Sauces': '🍯',
  'Oils & Fats': '🫒',
  'Nuts & Seeds': '🥜',
  'Legumes': '🫘',
};

const categoryColors: Record<string, string> = {
  'Meat & Poultry': 'from-rose-400 to-red-500',
  'Seafood': 'from-cyan-400 to-blue-500',
  'Vegetables': 'from-emerald-400 to-green-500',
  'Fruits': 'from-orange-400 to-red-500',
  'Dairy & Eggs': 'from-amber-400 to-yellow-500',
  'Herbs & Spices': 'from-lime-400 to-emerald-500',
  'Grains & Pasta': 'from-amber-400 to-orange-500',
  'Condiments & Sauces': 'from-violet-400 to-purple-500',
  'Oils & Fats': 'from-yellow-400 to-amber-500',
  'Nuts & Seeds': 'from-orange-400 to-amber-500',
  'Legumes': 'from-green-400 to-emerald-500',
};

export function getIngredientCategory(name: string): { category: string; emoji: string; gradient: string } {
  const lowerName = name.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryMap)) {
    for (const keyword of keywords) {
      if (lowerName.includes(keyword)) {
        return {
          category,
          emoji: categoryEmojis[category] || '🥘',
          gradient: categoryColors[category] || 'from-gray-400 to-gray-500',
        };
      }
    }
  }
  
  return {
    category: 'Other',
    emoji: '🥘',
    gradient: 'from-slate-400 to-gray-500',
  };
}

export function groupIngredientsByCategory(ingredients: Array<{ strIngredient: string }>): Record<string, Array<{ strIngredient: string }>> {
  const grouped: Record<string, Array<{ strIngredient: string }>> = {};
  
  for (const ing of ingredients) {
    const { category } = getIngredientCategory(ing.strIngredient);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(ing);
  }
  
  // Sort categories by predefined order
  const sortedCategories = Object.keys(categoryMap).concat('Other');
  const sorted: Record<string, Array<{ strIngredient: string }>> = {};
  
  for (const cat of sortedCategories) {
    if (grouped[cat]) {
      sorted[cat] = grouped[cat];
    }
  }
  
  return sorted;
}