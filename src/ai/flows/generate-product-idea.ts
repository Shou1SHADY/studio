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

const generateProductIdeaFlow = ai.defineFlow(
  {
    name: 'generateProductIdeaFlow',
    inputSchema: GenerateProductIdeaInputSchema,
    outputSchema: GenerateProductIdeaOutputSchema,
  },
  async input => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
          { "role": "system", "content": "You are an expert product designer. A user has an idea. Flesh it out into a concept. Keep it short and simple." },
          { "role": "user", "content": `User's Idea: ${input.description}` }
        ]
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenRouter API Error:", errorBody);
      throw new Error(`OpenRouter API request failed with status ${response.status}: ${errorBody}`);
    }

    const result = await response.json();
    
    if (result.choices && result.choices.length > 0 && result.choices[0].message.content) {
      return result.choices[0].message.content;
    }

    throw new Error('Failed to generate product idea. The AI returned an empty response.');
  }
);
