import { config } from 'dotenv';
config();

import '@/ai/flows/symptom-based-triage.ts';
import '@/ai/flows/image-based-diagnosis.ts';
import '@/ai/flows/educational-content-generation.ts';
import '@/ai/flows/personalized-recommendations.ts';