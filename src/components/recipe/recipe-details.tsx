import type { Recipe } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

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
        <ScrollArea className="flex-grow">
          <div className="pr-6 space-y-4">
            <h3 className="text-xl font-semibold mt-4">Instructions</h3>
            <DialogDescription asChild>
              <ul className="space-y-3 list-decimal list-inside text-foreground">
                {instructionSteps.map((step, index) => (
                  <li
                    key={index}
                    className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {step.replace(/^\d+\.\s*/, "")}
                  </li>
                ))}
              </ul>
            </DialogDescription>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
