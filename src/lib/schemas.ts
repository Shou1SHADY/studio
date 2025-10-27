import { z } from 'zod';

// Schema for the product idea generator
export const GenerateProductIdeaInputSchema = z.object({
  description: z.string().min(10, 'Please describe your idea in at least 10 characters.'),
});

// Schema for the output of the product idea generator
export const GenerateProductIdeaOutputSchema = z.object({
  name: z.string().describe('A catchy and creative name for the product.'),
  detailedDescription: z
    .string()
    .describe('A detailed, engaging description of the product concept.'),
  features: z.array(z.string()).describe('A list of key features for the product.'),
  materials: z
    .array(z.string())
    .describe(
      'A list of suggested materials for manufacturing the product (e.g., PVC, Embroidered Fabric).'
    ),
});
