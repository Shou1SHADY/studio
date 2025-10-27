'use server';
/**
 * @fileOverview A flow for generating a product idea from a user's description.
 *
 * - generateProductIdea - A function that generates a product concept.
 * - GenerateProductIdeaInput - The input type for the generateProductIdea function.
 * - GenerateProductIdeaOutput - The return type for the generateProductIdea function.
 */

import { ai } from '@/ai/genkit';
import { GenerateProductIdeaInputSchema, GenerateProductIdeaOutputSchema } from '@/lib/schemas';
import { z } from 'zod';

export type GenerateProductIdeaInput = z.infer<typeof GenerateProductIdeaInputSchema>;
export type GenerateProductIdeaOutput = z.infer<typeof GenerateProductIdeaOutputSchema>;

export async function generateProductIdea(
  input: GenerateProductIdeaInput
): Promise<GenerateProductIdeaOutput> {
  return generateProductIdeaFlow(input);
}

const generateProductIdeaPrompt = ai.definePrompt({
  name: 'generateProductIdeaPrompt',
  input: { schema: GenerateProductIdeaInputSchema },
  output: { schema: GenerateProductIdeaOutputSchema },
  prompt: `You are an expert product designer and branding specialist at a company called Elastic Canvas that makes custom physical products like rubber keychains and embroidered patches.

A user has submitted a product idea. Your task is to flesh it out into a more complete concept.

User's Idea: {{{description}}}

Based on the user's idea, generate the following:
1.  A catchy and creative product name.
2.  A detailed and engaging description that brings the product to life.
3.  A bulleted list of 3-5 key features.
4.  A list of suggested materials suitable for manufacturing (e.g., "Vibrant PVC Rubber", "High-Quality Embroidered Fabric").

Keep the tone enthusiastic, creative, and professional.
`,
});

const generateProductIdeaFlow = ai.defineFlow(
  {
    name: 'generateProductIdeaFlow',
    inputSchema: GenerateProductIdeaInputSchema,
    outputSchema: GenerateProductIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await generateProductIdeaPrompt(input);
    return output!;
  }
);
