"use server";

import { suggestRecipes } from "@/ai/flows/ingredient-based-recipe-suggestion";
import type { Recipe } from "@/lib/types";

export async function getRecipeSuggestions(
  ingredients: string
): Promise<{ recipes: Recipe[] } | { error: string }> {
  if (!ingredients.trim()) {
    return { error: "Please enter some ingredients." };
  }

  try {
    const result = await suggestRecipes({ ingredients });
    if (!result || !result.recipes || result.recipes.length === 0) {
      return {
        error: "Could not generate recipes. Try different ingredients.",
      };
    }
    return { recipes: result.recipes };
  } catch (error) {
    console.error("Error getting recipe suggestions:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
