'use server';

/**
 * @fileOverview Implements the X-ray diagnosis flow for analyzing medical images and providing probable diagnoses.
 *
 * - xrayDiagnosis - A function that handles the X-ray diagnosis process.
 * - XrayDiagnosisInput - The input type for the xrayDiagnosis function.
 * - XrayDiagnosisOutput - The return type for the xrayDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const XrayDiagnosisInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of an X-ray, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  age: z.number().describe('The age of the patient.'),
  sex: z.string().describe('The sex of the patient.'),
  symptoms: z.string().describe('Additional symptoms or clinical history provided by the patient or doctor.'),
});

export type XrayDiagnosisInput = z.infer<typeof XrayDiagnosisInputSchema>;

const XrayDiagnosisOutputSchema = z.object({
  findings: z.array(z.string()).describe('An array of key findings from the X-ray in English.'),
  findingsTa: z.array(z.string()).describe('An array of key findings from the X-ray in Tamil.'),
  impression: z.string().describe('The overall impression or summary of the diagnosis in English.'),
  impressionTa: z.string().describe('The overall impression or summary of the diagnosis in Tamil.'),
  recommendations: z.array(z.string()).describe('Recommended next steps in English.'),
  recommendationsTa: z.array(z.string()).describe('Recommended next steps in Tamil.'),
  confidence: z.number().describe('The confidence score of the diagnosis (0-1).'),
  explanationEn: z.string().describe('Detailed explanation of the findings in English.'),
  explanationTa: z.string().describe('Detailed explanation of the findings in Tamil.'),
});

export type XrayDiagnosisOutput = z.infer<typeof XrayDiagnosisOutputSchema>;

export async function xrayDiagnosis(
  input: XrayDiagnosisInput
): Promise<XrayDiagnosisOutput> {
  return xrayDiagnosisFlow(input);
}

const xrayDiagnosisPrompt = ai.definePrompt({
  name: 'xrayDiagnosisPrompt',
  input: {schema: XrayDiagnosisInputSchema},
  output: {schema: XrayDiagnosisOutputSchema},
  prompt: `You are a medical AI assistant that specializes in analyzing X-ray images.

  Analyze the X-ray image and patient information to provide key findings, an overall impression, a confidence score, and actionable recommendations. Provide all text fields in both English and Tamil.

  Patient Information:
  - Age: {{{age}}}
  - Sex: {{{sex}}}
  - Symptoms/History: {{{symptoms}}}

  Image: {{media url=imageDataUri}}

  Respond in JSON format, according to this schema:
  {
    "findings": ["list of key findings in English"],
    "findingsTa": ["list of key findings in Tamil"],
    "impression": "Overall impression or summary of the diagnosis in English",
    "impressionTa": "Overall impression or summary of the diagnosis in Tamil",
    "recommendations": ["list of recommended next steps in English"],
    "recommendationsTa": ["list of recommended next steps in Tamil"],
    "confidence": float (0-1),
    "explanationEn": "Detailed explanation of the findings in English",
    "explanationTa": "Detailed explanation of the findings in Tamil"
  }
  `,
});

const xrayDiagnosisFlow = ai.defineFlow(
  {
    name: 'xrayDiagnosisFlow',
    inputSchema: XrayDiagnosisInputSchema,
    outputSchema: XrayDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await xrayDiagnosisPrompt(input);
    return output!;
  }
);
