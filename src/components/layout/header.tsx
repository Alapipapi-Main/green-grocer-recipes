import { ChefHat } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 border-b">
      <div className="container mx-auto flex items-center gap-4 px-4">
        <div className="bg-primary rounded-full p-2">
          <ChefHat className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Green Grocer Recipes
        </h1>
      </div>
    </header>
  );
}
