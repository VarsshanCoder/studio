import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Hospital, LayoutDashboard, FileText, Bot } from 'lucide-react';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Actionable Recommendations',
    description: 'Get personalized advice, from home care to booking a consultation.',
    className: 'md:col-span-2',
  },
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: 'Unified Dashboards',
    description: 'Separate, role-based views for patients, doctors, and admins.',
  },
  {
    icon: <Hospital className="h-8 w-8 text-primary" />,
    title: 'Nearby Hospitals',
    description: 'Find trusted hospitals and clinics in Tamil Nadu near you.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Privacy & Compliance',
    description: 'Your data is encrypted, secure, and under your control.',
    className: 'md:col-span-3',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">A Complete Health Ecosystem</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-balance">
            From initial diagnosis to follow-up care, AarogyamAI provides the tools you need.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className={`bg-card/80 backdrop-blur-sm ${feature.className}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
