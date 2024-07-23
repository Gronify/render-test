'use client'

import Link from 'next/link';
import { Recipe } from "@/types/types";
import Image from 'next/image';
import { fetchRecipes } from '../api/api';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';


const RecipesPage = () => {

  const [recipes, setRecipes] = useState<Recipe[]>([])
  useEffect(() => {
    fetchRecipes().then((res) => {
      setRecipes(res)
    })
  }, [])

  return (
    <div className="">
      <Link href="../" className="text-blue-500 hover:underline">
        Back to List
      </Link>
      <h1 className="text-2xl font-bold mb-4">Select a Recipe:</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`${recipe.id}`} className="block">

              <Image src={recipe.image} alt={recipe.name} width={360} height={360} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl f">{recipe.name}</h2>
              </div>

            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default dynamic(() => Promise.resolve(RecipesPage), { ssr: false })