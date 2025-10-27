'use server';
/**
 * @fileOverview A flow for generating a product idea from a user's description.
 *
 * - generateProductIdea - A function that generates a product concept.
 * - GenerateProductIdeaInput - The input type for the generateProductIdea function.
 * - GenerateProductIdeaOutput - The return type for the generateProductIdea function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {
  GenerateProductIdeaInputSchema,
  GenerateProductIdeaOutputSchema,
} from '@/lib/schemas';
import {z} from 'zod';

export type GenerateProductIdeaInput = z.infer<
  typeof GenerateProductIdeaInputSchema
>;
export type GenerateProductIdeaOutput = z.infer<
  typeof GenerateProductIdeaOutputSchema
>;

export async function generateProductIdea(
  input: GenerateProductIdeaInput
): Promise<GenerateProductIdeaOutput> {
  return generateProductIdeaFlow(input);
}

const generateProductIdeaPrompt = ai.definePrompt({
  name: 'generateProductIdeaPrompt',
  input: {schema: GenerateProductIdeaInputSchema},
  output: {schema: GenerateProductIdeaOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are an expert product designer. A user has an idea. Flesh it out into a concept.
  Keep it short and simple.
  User's Idea: {{{description}}}
  `,
});

const generateProductIdeaFlow = ai.defineFlow(
  {
    name: 'generateProductIdeaFlow',
    inputSchema: GenerateProductIdeaInputSchema,
    outputSchema: GenerateProductIdeaOutputSchema,
  },
  async input => {
    const {output} = await generateProductIdeaPrompt(input);
    if (!output) {
      throw new Error('Failed to generate product idea. The AI returned an empty response.');
    }
    return output;
  }
);
