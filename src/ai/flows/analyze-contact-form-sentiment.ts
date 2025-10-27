'use server';

/**
 * @fileOverview Analyzes the sentiment of contact form submissions.
 *
 * - analyzeContactFormSubmission - Analyzes the sentiment of a contact form submission.
 * - AnalyzeContactFormSubmissionInput - The input type for the analyzeContactFormSubmission function.
 * - AnalyzeContactFormSubmissionOutput - The return type for the analyzeContactFormSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContactFormSubmissionInputSchema = z.object({
  message: z.string().describe('The message submitted via the contact form.'),
});
export type AnalyzeContactFormSubmissionInput = z.infer<typeof AnalyzeContactFormSubmissionInputSchema>;

const AnalyzeContactFormSubmissionOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the message, which can be positive, negative, or neutral.'
    ),
  isNegative: z
    .boolean()
    .describe('Whether the sentiment of the message is negative.'),
});
export type AnalyzeContactFormSubmissionOutput = z.infer<typeof AnalyzeContactFormSubmissionOutputSchema>;

export async function analyzeContactFormSubmission(
  input: AnalyzeContactFormSubmissionInput
): Promise<AnalyzeContactFormSubmissionOutput> {
  return analyzeContactFormSubmissionFlow(input);
}

const analyzeContactFormSubmissionPrompt = ai.definePrompt({
  name: 'analyzeContactFormSubmissionPrompt',
  input: {schema: AnalyzeContactFormSubmissionInputSchema},
  output: {schema: AnalyzeContactFormSubmissionOutputSchema},
  prompt: `You are an AI sentiment analyzer.  You will receive a message submitted via a contact form, and you will determine the sentiment of the message.

Message: {{{message}}}

Determine the overall sentiment of the message, and set the sentiment output field to either "positive", "negative", or "neutral".  If the sentiment is negative, set the isNegative output field to true.  Otherwise, set it to false.
`,
});

const analyzeContactFormSubmissionFlow = ai.defineFlow(
  {
    name: 'analyzeContactFormSubmissionFlow',
    inputSchema: AnalyzeContactFormSubmissionInputSchema,
    outputSchema: AnalyzeContactFormSubmissionOutputSchema,
  },
  async input => {
    const {output} = await analyzeContactFormSubmissionPrompt(input);
    return output!;
  }
);
