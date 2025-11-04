
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Actionable Recommendations</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
              Get personalized advice, from home care to booking a consultation.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot /> AI-Powered Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  After analyzing your symptoms or medical images, AarogyamAI provides clear, actionable recommendations tailored to your situation. Our goal is to empower you with the information you need to take the right next steps for your health.
                </p>
                <p>
                  Recommendations can range from simple home care advice for mild conditions to suggestions for over-the-counter medication. For more serious concerns, we will advise you to seek professional medical attention and can even help you find nearby hospitals.
                </p>
                <p>
                  Every piece of advice is generated based on a comprehensive analysis, but it is crucial to remember that AarogyamAI is an informational tool and not a substitute for a professional medical diagnosis. Always consult a qualified healthcare provider for medical advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
