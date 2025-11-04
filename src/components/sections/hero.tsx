import Link from 'next/link';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ScanLine, Stethoscope } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 light-rays"></div>
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 animate-blur-in font-headline">
          Intelligent Healthcare, Instantly
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 text-balance">
          AarogyamAI provides AI-powered symptom analysis and image-based diagnosis in English and Tamil. Get insights and recommended next steps in minutes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/triage/symptoms">
            <SpotlightCard className="p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-headline">Symptom Triage</h3>
                <p className="text-muted-foreground mb-4">
                  Describe your symptoms and get an instant severity assessment.
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary">
                  Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </SpotlightCard>
          </Link>
          <Link href="/triage/image">
            <SpotlightCard className="p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <ScanLine className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-headline">Image Diagnosis</h3>
                <p className="text-muted-foreground mb-4">
                  Upload an image for AI-powered analysis of your condition.
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary">
                  Upload Image <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </SpotlightCard>
          </Link>
        </div>
      </div>
    </section>
  );
}
