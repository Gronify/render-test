import type { Recipe } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { fetchRecipe, fetchRecipes } from "../../api/api";
import { notFound } from "next/navigation";

interface RecipesPageProps {
  params: {
    id: string;
  };
}
async function fetchRecipeWithRetry(id: string, retries = 10): Promise<Recipe> {
  for (let i = 0; i < retries; i++) {
    const res = await fetchRecipe(id);
    if (res && res.ingredients?.length > 0) return res;
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Failed to fetch recipe ${id} after ${retries} retries`);
}

const RecipePage = async ({ params }: RecipesPageProps) => {
  const recipe: Recipe = await fetchRecipeWithRetry(params.id);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Link href="../" className="text-blue-500 hover:underline">
          Back to Recipes
        </Link>
        <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={360}
          height={360}
          className=" h-64 object-cover rounded-lg mb-4"
        />
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <p>
            <strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes
          </p>
          <p>
            <strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <p>
            <strong>Calories per Serving:</strong> {recipe.caloriesPerServing}
          </p>
          <p>
            <strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount}{" "}
            reviews)
          </p>
          <p>
            <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
          </p>
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
          <p>
            <strong>Tags:</strong> {recipe ? recipe.tags.join(", ") : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;

export async function generateStaticParams() {
  const recipes: Recipe[] = await fetchRecipes();
  return recipes.map((recipe) => {
    return {
      id: recipe.id.toString(),
    };
  });
}
