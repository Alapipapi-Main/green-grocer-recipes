"use client";

import { useState } from "react";
import type { Recipe } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getRecipeSuggestions } from "@/app/actions";
import { Header } from "@/components/layout/header";
import { IngredientForm } from "@/components/recipe/ingredient-form";
import { RecipeSuggestions } from "@/components/recipe/recipe-suggestions";
import { FavoritesList } from "@/components/recipe/favorites-list";
import { RecipeDetails } from "@/components/recipe/recipe-details";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useLocalStorage<Recipe[]>("favorites", []);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
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

  const isFavorite = (recipe: Recipe) => {
    return favorites.some(
      (fav) =>
        fav.name === recipe.name && fav.instructions === recipe.instructions
    );
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe)) {
      setFavorites(
        favorites.filter(
          (fav) =>
            fav.name !== recipe.name || fav.instructions !== recipe.instructions
        )
      );
      toast({ description: "Removed from favorites." });
    } else {
      setFavorites([...favorites, recipe]);
      toast({ description: "Added to favorites!" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto py-8">
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
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          </div>
          <div className="mt-8 lg:mt-0">
            <FavoritesList
              favorites={favorites}
              onSelectRecipe={setSelectedRecipe}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </main>
      <RecipeDetails
        recipe={selectedRecipe}
        onOpenChange={(open) => !open && setSelectedRecipe(null)}
      />
    </div>
  );
}
