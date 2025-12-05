import type { Recipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, Soup } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onView: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export function RecipeCard({
  recipe,
  onView,
  onToggleFavorite,
  isFavorite,
}: RecipeCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <span className="flex-1">{recipe.name}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            aria-label="Toggle favorite"
            className="shrink-0"
          >
            <Star
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>
          Click below to see the full recipe instructions.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={onView} className="w-full">
          <Soup className="mr-2 h-4 w-4" /> View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
