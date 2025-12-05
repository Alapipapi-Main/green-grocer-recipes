import type { Recipe } from "@/lib/types";
import { RecipeCard } from "./recipe-card";
import { Card, CardContent } from "@/components/ui/card";
import { BookHeart } from "lucide-react";

interface FavoritesListProps {
  favorites: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
}

export function FavoritesList({
  favorites,
  onSelectRecipe,
  onToggleFavorite,
}: FavoritesListProps) {
  return (
    <div className="space-y-4 rounded-lg bg-muted/30 p-4 lg:p-6 h-full">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <BookHeart className="h-6 w-6 text-primary" />
        Favorite Recipes
      </h2>
      {favorites.length === 0 ? (
        <Card className="border-dashed bg-background">
          <CardContent className="p-6 text-center text-muted-foreground">
            <p>Your favorite recipes will be saved here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {favorites.map((recipe, index) => (
            <RecipeCard
              key={`${recipe.name}-${index}`}
              recipe={recipe}
              onView={() => onSelectRecipe(recipe)}
              onToggleFavorite={() => onToggleFavorite(recipe)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
