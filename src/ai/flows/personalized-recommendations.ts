'use server';

/**
 * @fileOverview Provides personalized recommendations based on the triage assessment of symptoms.
 *
 * - getPersonalizedRecommendations - A function that generates personalized recommendations for patients.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  triageAssessment: z
    .string()
    .describe(
      'The triage assessment result, including severity (mild, moderate, severe) and identified symptoms.'
    ),
  patientLocale: z
    .enum(['en', 'ta'])
    .describe('The patient\u0027s preferred language (en for English, ta for Tamil).'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized recommendations based on the triage assessment.'),
  educationContent: z
    .array(z.string())
    .describe('A list of relevant educational content URLs or descriptions.'),
  confidenceScore: z
    .number()
    .describe('A confidence score (0-1) indicating the reliability of the recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `Based on the following triage assessment:\n\n{{triageAssessment}}\n\nProvide personalized recommendations for over-the-counter medicines, home care, or prompts to book a doctor consultation.\nAlso, provide relevant bilingual patient education content URLs or descriptions in {{patientLocale}}.\n\nReturn a confidence score (0-1) indicating the reliability of the recommendations.\n\nFormat the response as a JSON object.`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);
