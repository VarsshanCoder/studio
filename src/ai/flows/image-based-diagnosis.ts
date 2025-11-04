// src/ai/flows/image-based-diagnosis.ts
'use server';

/**
 * @fileOverview Implements the image-based diagnosis flow for analyzing medical images and providing probable diagnoses.
 *
 * - imageBasedDiagnosis - A function that handles the image-based diagnosis process.
 * - ImageBasedDiagnosisInput - The input type for the imageBasedDiagnosis function.
 * - ImageBasedDiagnosisOutput - The return type for the imageBasedDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageBasedDiagnosisInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a skin condition, wound, rash, dental issue, or eye problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  age: z.number().describe('The age of the patient.'),
  sex: z.string().describe('The sex of the patient.'),
  region: z.string().describe('The region of the patient.'),
  symptoms: z.string().describe('Additional symptoms described by the patient.'),
});

export type ImageBasedDiagnosisInput = z.infer<typeof ImageBasedDiagnosisInputSchema>;

const ImageBasedDiagnosisOutputSchema = z.object({
  diagnosis: z.array(z.string()).describe('An array of probable diagnoses.'),
  confidence: z.number().describe('The confidence score of the diagnosis (0-1).'),
  severity: z.enum(['mild', 'moderate', 'severe']).describe('The severity of the condition.'),
  recommendations: z.array(z.string()).describe('Recommended next steps in both Tamil and English.'),
  followUp: z.array(z.string()).describe('A structured follow-up plan.'),
  explanationEn: z.string().describe('Explanation of the diagnosis in English'),
  explanationTa: z.string().describe('Explanation of the diagnosis in Tamil'),
});

export type ImageBasedDiagnosisOutput = z.infer<typeof ImageBasedDiagnosisOutputSchema>;

export async function imageBasedDiagnosis(
  input: ImageBasedDiagnosisInput
): Promise<ImageBasedDiagnosisOutput> {
  return imageBasedDiagnosisFlow(input);
}

const imageBasedDiagnosisPrompt = ai.definePrompt({
  name: 'imageBasedDiagnosisPrompt',
  input: {schema: ImageBasedDiagnosisInputSchema},
  output: {schema: ImageBasedDiagnosisOutputSchema},
  prompt: `You are a medical AI assistant that specializes in image-based diagnosis.

  Analyze the image and patient information to provide a probable diagnosis, confidence score, severity assessment, and actionable recommendations in both Tamil and English. Provide the response as a JSON object.

  Patient Information:
  - Age: {{{age}}}
  - Sex: {{{sex}}}
  - Region: {{{region}}}
  - Symptoms: {{{symptoms}}}

  Image: {{media url=imageDataUri}}

  Respond in JSON format, according to this schema:
  {
    "diagnosis": ["list of probable diagnoses"],
    "confidence": float (0-1),
    "severity": "mild|moderate|severe",
    "recommendations": ["list of recommended next steps in both Tamil and English"],
    "followUp": ["structured follow-up plan"],
    "explanationEn": "Explanation of the diagnosis in English",
    "explanationTa": "Explanation of the diagnosis in Tamil"
  }
  `,
});

const imageBasedDiagnosisFlow = ai.defineFlow(
  {
    name: 'imageBasedDiagnosisFlow',
    inputSchema: ImageBasedDiagnosisInputSchema,
    outputSchema: ImageBasedDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await imageBasedDiagnosisPrompt(input);
    return output!;
  }
);
