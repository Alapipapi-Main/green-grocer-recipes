import type { Recipe } from "@/lib/types";
import { RecipeCard } from "./recipe-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RecipeSuggestionsProps {
  suggestions: Recipe[];
  isLoading: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: (recipe: Recipe) => boolean;
}

export function RecipeSuggestions({
  suggestions,
  isLoading,
  onSelectRecipe,
  onToggleFavorite,
  isFavorite,
}: RecipeSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Generating ideas...</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Lightbulb className="h-6 w-6" />
            Your recipe ideas will appear here
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Enter some ingredients you have and we'll whip up some delicious
            suggestions for you!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Here's what you can make:</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {suggestions.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            onView={() => onSelectRecipe(recipe)}
            onToggleFavorite={() => onToggleFavorite(recipe)}
            isFavorite={isFavorite(recipe)}
          />
        ))}
      </div>
    </div>
  );
}
