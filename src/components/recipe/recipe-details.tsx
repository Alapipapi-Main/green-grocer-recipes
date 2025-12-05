import type { Recipe } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface RecipeDetailsProps {
  recipe: Recipe | null;
  onOpenChange: (open: boolean) => void;
}

export function RecipeDetails({ recipe, onOpenChange }: RecipeDetailsProps) {
  if (!recipe) return null;

  const instructionSteps = recipe.instructions
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80svh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline pr-6">
            {recipe.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow min-h-0">
          <ScrollArea className="h-full pr-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Instructions</h3>
              <ol className="space-y-4">
                {instructionSteps.map((step, index) => (
                  <li
                    key={index}
                    className={cn(
                      "flex items-start gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                    )}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1 text-foreground/90">
                      {step.replace(/^\d+\.\s*/, "")}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
