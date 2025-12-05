"use client";

import { useState, useEffect } from "react";
import type { Recipe } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getRecipeSuggestions } from "@/app/actions";
import { IngredientForm } from "@/components/recipe/ingredient-form";
import { RecipeSuggestions } from "@/components/recipe/recipe-suggestions";
import { FavoritesList } from "@/components/recipe/favorites-list";
import { RecipeDetails } from "@/components/recipe/recipe-details";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function GeneratorPage() {
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useLocalStorage<Recipe[]>("favorites", []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { toast } = useToast();

  const handleSuggestRecipes = async ({
    ingredients,
  }: {
    ingredients: string;
  }) => {
    setIsLoading(true);
    setSuggestions([]);
    const result = await getRecipeSuggestions(ingredients);
    if ("error" in result) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: result.error,
      });
    } else {
      setSuggestions(result.recipes);
    }
    setIsLoading(false);
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (fav) => fav.name === recipe.name && fav.instructions === recipe.instructions
      );
      if (isFavorite) {
        toast({ description: "Removed from favorites." });
        return prevFavorites.filter(
          (fav) => fav.name !== recipe.name || fav.instructions !== recipe.instructions
        );
      } else {
        toast({ description: "Added to favorites!" });
        return [...prevFavorites, recipe];
      }
    });
  };
  
  const isFavorite = (recipe: Recipe) => {
    return favorites.some(
      (fav) => fav.name === recipe.name && fav.instructions === recipe.instructions
    );
  };

  return (
    <main className="container mx-auto p-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <IngredientForm
            onSubmit={handleSuggestRecipes}
            isLoading={isLoading}
          />
          <Separator />
          <RecipeSuggestions
            suggestions={suggestions}
            isLoading={isLoading}
            onSelectRecipe={setSelectedRecipe}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        </div>
        {isClient && (
          <div className="mt-8 lg:mt-0">
            <FavoritesList
              favorites={favorites}
              onSelectRecipe={setSelectedRecipe}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )}
      </div>
      <RecipeDetails
        recipe={selectedRecipe}
        onOpenChange={(open) => !open && setSelectedRecipe(null)}
      />
    </main>
  );
}
