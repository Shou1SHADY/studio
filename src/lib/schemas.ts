import { z } from 'zod';

// Schema for the product idea generator
export const GenerateProductIdeaInputSchema = z.object({
  description: z.string().min(10, 'Please describe your idea in at least 10 characters.'),
});

// Schema for the output of the product idea generator
export const GenerateProductIdeaOutputSchema = z
  .string()
  .describe(
    'The generated product idea as a markdown-formatted string. It should include sections for "Name", "Description", "Features", and "Materials".'
  );
