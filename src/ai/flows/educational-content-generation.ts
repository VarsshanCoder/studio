'use server';

/**
 * @fileOverview Educational content generation flow for patients in Tamil and English.
 *
 * - generateEducationalContent - A function that generates educational content.
 * - EducationalContentInput - The input type for the generateEducationalContent function.
 * - EducationalContentOutput - The return type for the generateEducationalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EducationalContentInputSchema = z.object({
  topic: z.string().describe('The topic for the educational content.'),
  language: z.enum(['en', 'ta']).describe('The language for the content (en: English, ta: Tamil).'),
});
export type EducationalContentInput = z.infer<typeof EducationalContentInputSchema>;

const EducationalContentOutputSchema = z.object({
  title: z.string().describe('The title of the educational content.'),
  content: z.string().describe('The educational content in the specified language.'),
});
export type EducationalContentOutput = z.infer<typeof EducationalContentOutputSchema>;

export async function generateEducationalContent(input: EducationalContentInput): Promise<EducationalContentOutput> {
  return educationalContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'educationalContentPrompt',
  input: {schema: EducationalContentInputSchema},
  output: {schema: EducationalContentOutputSchema},
  prompt: `You are an expert in generating patient educational content in both English and Tamil.

  Generate educational content on the following topic in the specified language:

  Topic: {{{topic}}}
  Language: {{{language}}}

  Ensure the content is easy to understand for patients with limited medical knowledge.

  Output a title and the content in the specified language.

  Title: The title of the educational content.
  Content: The educational content in the specified language.`,
});

const educationalContentFlow = ai.defineFlow(
  {
    name: 'educationalContentFlow',
    inputSchema: EducationalContentInputSchema,
    outputSchema: EducationalContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
