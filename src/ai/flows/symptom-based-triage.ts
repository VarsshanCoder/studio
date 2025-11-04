'use server';
/**
 * @fileOverview An AI agent for symptom-based triage, providing severity assessment and next steps.
 *
 * - symptomBasedTriage - A function that handles the symptom triage process.
 * - SymptomBasedTriageInput - The input type for the symptomBasedTriage function.
 * - SymptomBasedTriageOutput - The return type for the symptomBasedTriage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomBasedTriageInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the patient.'),
  language: z.enum(['en', 'ta']).describe('The preferred language of the patient (en for English, ta for Tamil).'),
});
export type SymptomBasedTriageInput = z.infer<typeof SymptomBasedTriageInputSchema>;

const SymptomBasedTriageOutputSchema = z.object({
  severity: z.enum(['mild', 'moderate', 'severe']).describe('The severity of the symptoms.'),
  recommendations: z.array(z.string()).describe('Recommended next steps for the patient.'),
  confidence: z.number().describe('The confidence score of the triage assessment (0-1).'),
  explanation: z.string().describe('Explanation of the triage assessment in the patient\u0027s preferred language.'),
});
export type SymptomBasedTriageOutput = z.infer<typeof SymptomBasedTriageOutputSchema>;

export async function symptomBasedTriage(input: SymptomBasedTriageInput): Promise<SymptomBasedTriageOutput> {
  return symptomBasedTriageFlow(input);
}

const symptomTriagePrompt = ai.definePrompt({
  name: 'symptomTriagePrompt',
  input: {schema: SymptomBasedTriageInputSchema},
  output: {schema: SymptomBasedTriageOutputSchema},
  prompt: `You are an AI assistant specializing in providing symptom-based triage. A patient will describe their symptoms, and you will provide a severity assessment (mild, moderate, or severe), recommendations for next steps, and a confidence score (0-1).

Symptoms: {{{symptoms}}}
Language: {{{language}}}

Respond in the patient's preferred language.

Respond with a JSON object that has the following keys:
- severity: (\"mild\", \"moderate\", or \"severe\")
- recommendations: (a list of strings)
- confidence: (a number between 0 and 1)
- explanation: (a string explaining the triage assessment)

Consider the language of the patient, and use it in the explanation field. If the language is Tamil, translate your reasoning into Tamil.
`,
});

const symptomBasedTriageFlow = ai.defineFlow(
  {
    name: 'symptomBasedTriageFlow',
    inputSchema: SymptomBasedTriageInputSchema,
    outputSchema: SymptomBasedTriageOutputSchema,
  },
  async input => {
    const {output} = await symptomTriagePrompt(input);
    return output!;
  }
);
