'use server';
/**
 * @fileOverview This file defines a Genkit flow for refining a recipe from a user-provided description.
 *
 * The flow takes a recipe description as input and returns a detailed recipe.
 * It exports:
 *   - recipeRefinementFromDescription: The main function to call the flow.
 *   - RecipeRefinementFromDescriptionInput: The input type for the flow.
 *   - RecipeRefinementFromDescriptionOutput: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeRefinementFromDescriptionInputSchema = z.object({
  description: z
    .string()
    .describe("A description of the recipe the user is looking for (e.g., 'vegetarian pasta dish with lemon and herbs')."),
});
export type RecipeRefinementFromDescriptionInput = z.infer<typeof RecipeRefinementFromDescriptionInputSchema>;

const RecipeRefinementFromDescriptionOutputSchema = z.object({
  recipeName: z.string().describe('The name of the refined recipe.'),
  ingredients: z.string().describe('A list of ingredients for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
});
export type RecipeRefinementFromDescriptionOutput = z.infer<typeof RecipeRefinementFromDescriptionOutputSchema>;

export async function recipeRefinementFromDescription(
  input: RecipeRefinementFromDescriptionInput
): Promise<RecipeRefinementFromDescriptionOutput> {
  return recipeRefinementFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeRefinementFromDescriptionPrompt',
  input: {schema: RecipeRefinementFromDescriptionInputSchema},
  output: {schema: RecipeRefinementFromDescriptionOutputSchema},
  prompt: `You are a professional chef. Please generate a detailed recipe based on the following description:\n\n{{{description}}}\n\nInclude a recipe name, a list of ingredients, and step-by-step instructions.`,
});

const recipeRefinementFromDescriptionFlow = ai.defineFlow(
  {
    name: 'recipeRefinementFromDescriptionFlow',
    inputSchema: RecipeRefinementFromDescriptionInputSchema,
    outputSchema: RecipeRefinementFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
