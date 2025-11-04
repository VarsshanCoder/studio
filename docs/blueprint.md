# **App Name**: AarogyamAI

## Core Features:

- Bilingual Image Analysis: Users upload images for AI-powered diagnosis of skin, wound, rash, dental, and eye conditions, with explanations and confidence scores in both Tamil and English. It also returns the confidence score and structured follow-up plan using the Gemini Vision model and LLM as a tool for JSON response and reasoning about confidence.
- Symptom Triage: AI-driven symptom analysis via chat or form, providing a severity assessment (mild/moderate/severe) and next steps in Tamil and English. The Gemini LLM is used as a tool to respond with a structured JSON response, and reasoned follow-up suggestions.
- Actionable Recommendations: Suggests OTC medicines, home care, or prompts doctor consultation booking based on triage severity, with bilingual patient education content.
- Doctor/Patient Dashboards: Role-based dashboards with appointment management, chat/teleconsultation, and medical record access.
- Admin Portal: Manage users, content, hospitals, audit logs, and system settings.
- Nearby Hospital Recommendations: Suggests Tamil Nadu hospitals based on user location with contact info, distance, and route links.
- Privacy & Compliance: Consent flows, data encryption, role-based access, audit logs, data retention controls.

## Style Guidelines:

- The concept for the color choices will be tranquility, clarity, and health. Dark color scheme will be used. Primary color: a calming blue (#75A4FF).
- Background color: a muted, desaturated shade of the primary color (#192333).
- Accent color: a slightly more saturated, lighter shade of blue (#A3B9FF).
- Body and headline font: 'PT Sans', a humanist sans-serif known for its modern look and readability.
- Code font: 'Source Code Pro' for displaying code snippets.
- Clean, minimalist icons for medical concepts and actions, ensuring clarity and ease of use in a bilingual context.
- Leverage ReactBits components for sleek, animated UI elements. Use 'light-rays' for landing background, 'spotlight-card' with 'blur-text' for hero cards, 'scroll-float' for floating CTAs, 'bubble-menu' for main navigation, 'magic-bento' for dashboard tiles, and 'dock' for a persistent quick access bar.
- Incorporate subtle animations for onboarding, status changes, and teleconsultation highlights ('spotlight' + animated background), enhancing user engagement and providing clear feedback.