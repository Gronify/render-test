'use client'

import type { Recipe } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { fetchRecipe } from '../../api/api';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';


interface RecipesPageProps {
  params: {
    id: string;
  };
}

const RecipePage = ({ params }: RecipesPageProps) => {

  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    name: '',
    ingredients: [],
    instructions: [],
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 0,
    difficulty: '',
    cuisine: '',
    caloriesPerServing: 0,
    tags: [],
    userId: 0,
    image: '',
    rating: 0,
    reviewCount: 0,
    mealType: [],
  })
  useEffect(() => {
    fetchRecipe(params.id).then((res) => {
      setRecipe(res)
    })
  }, [])
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Link href="../" className="text-blue-500 hover:underline">
          Back to Recipes
        </Link>
        <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
        <Image src={recipe.image} alt={recipe.name} width={360} height={360} className=" h-64 object-cover rounded-lg mb-4" />
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
          <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
          <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
          <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">

          <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(RecipePage), { ssr: false })