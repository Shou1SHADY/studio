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
import { config } from 'dotenv';

config();

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

const generateProductIdeaFlow = ai.defineFlow(
  {
    name: 'generateProductIdeaFlow',
    inputSchema: GenerateProductIdeaInputSchema,
    outputSchema: GenerateProductIdeaOutputSchema,
  },
  async input => {
    const prompt = `You are an expert product designer and branding specialist at a company called Elastic Canvas that makes custom physical products like rubber keychains and embroidered patches.

A user has submitted a product idea. Your task is to flesh it out into a more complete concept.

User's Idea: ${input.description}

Based on the user's idea, generate the following:
1.  A catchy and creative product name.
2.  A detailed and engaging description that brings the product to life.
3.  A bulleted list of 3-5 key features.
4.  A list of suggested materials suitable for manufacturing (e.g., "Vibrant PVC Rubber", "High-Quality Embroidered Fabric").

Keep the tone enthusiastic, creative, and professional.

Return the result as a valid JSON object that conforms to the following schema:
{
  "name": "string",
  "detailedDescription": "string",
  "features": ["string"],
  "materials": ["string"]
}
`;

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'minimax/minimax-m2:free',
          messages: [{role: 'user', content: prompt}],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenRouter API request failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    const jsonString = data.choices[0].message.content;

    try {
      // The model might return a string that is a JSON object. We need to parse it.
      const parsedOutput = JSON.parse(jsonString);
      // Validate the parsed object against our schema
      return GenerateProductIdeaOutputSchema.parse(parsedOutput);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      throw new Error('The AI returned an invalid response format.');
    }
  }
);
