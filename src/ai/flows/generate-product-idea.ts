'use server';
/**
 * @fileOverview A flow for generating a product idea from a user's description.
 *
 * - generateProductIdea - A function that generates a product concept.
 * - GenerateProductIdeaInput - The input type for the generateProductIdea function.
 * - GenerateProductIdeaOutput - The return type for the generateProductIdea function.
 */

import {ai} from '@/ai/genkit';
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
  prompt: `You are an expert product designer and branding specialist at a company called Elastic Canvas that makes custom physical products like rubber keychains and embroidered patches.

A user has submitted a product idea. Your task is to flesh it out into a more complete concept.

User's Idea: {{{description}}}

Based on the user's idea, generate a markdown-formatted response with the following sections:
- **Name**: A catchy and creative product name.
- **Description**: A detailed and engaging description that brings the product to life.
- **Features**: A bulleted list of 3-5 key features.
- **Materials**: A bulleted list of suggested materials suitable for manufacturing (e.g., "Vibrant PVC Rubber", "High-Quality Embroidered Fabric").

Keep the tone enthusiastic, creative, and professional.

Example format:
**Name**: Supernova Fox Keychain
**Description**: A keychain of a fox...
**Features**:
* Feature 1
* Feature 2
**Materials**:
* Material 1
* Material 2
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
