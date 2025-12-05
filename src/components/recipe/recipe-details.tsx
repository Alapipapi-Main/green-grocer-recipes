import type { Recipe } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChefHat } from "lucide-react";

interface RecipeDetailsProps {
  recipe: Recipe | null;
  onOpenChange: (open: boolean) => void;
}

export function RecipeDetails({ recipe, onOpenChange }: RecipeDetailsProps) {
  if (!recipe) return null;

  const instructionSteps = recipe.instructions
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((step) => step.replace(/^\d+\.\s*/, ""));

  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[90svh] sm:h-[80svh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-headline pr-6">
            {recipe.name}
          </DialogTitle>
          <DialogDescription>
            Follow the steps below to create your delicious dish.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 pb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Instructions
            </h3>
            <ol className="space-y-6 border-l-2 border-primary/20 ml-1">
              {instructionSteps.map((step, index) => (
                <li
                  key={index}
                  className={cn(
                    "relative flex items-start gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                  )}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="absolute -left-[11px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="pl-8 text-foreground/90 min-w-0 break-words">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
