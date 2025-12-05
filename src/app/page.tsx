"use client";

import { useState, useEffect } from "react";
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

function FavoritesSection() {
  const [favorites, setFavorites] = useLocalStorage<Recipe[]>("favorites", []);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

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
    <>
      <div className="mt-8 lg:mt-0">
        <FavoritesList
          favorites={favorites}
          onSelectRecipe={setSelectedRecipe}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      <RecipeDetails
        recipe={selectedRecipe}
        onOpenChange={(open) => !open && setSelectedRecipe(null)}
      />
    </>
  );
}

export default function Home() {
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites] = useLocalStorage<Recipe[]>("favorites", []);
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

  const isFavorite = (recipe: Recipe) => {
    return favorites.some(
      (fav) =>
        fav.name === recipe.name && fav.instructions === recipe.instructions
    );
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    // This logic is now duplicated in FavoritesSection,
    // but it's necessary for the RecipeSuggestions part.
    const [_, setFavorites] = useLocalStorage<Recipe[]>("favorites", []);
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
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          </div>
          {isClient && <FavoritesSection />}
        </div>
      </main>
      <RecipeDetails
        recipe={selectedRecipe}
        onOpenChange={(open) => !open && setSelectedRecipe(null)}
      />
    </div>
  );
}