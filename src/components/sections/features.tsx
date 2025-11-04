// @ts-nocheck
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Hospital, LayoutDashboard, Bot } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

export default function FeaturesGrid() {
    const { t } = useTranslation();

    const features = [
        {
          icon: <Bot className="h-8 w-8 text-primary" />,
          title: t('features.actionableRecommendations'),
          description: t('features.actionableRecommendationsDesc'),
          className: 'md:col-span-2',
        },
        {
          icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
          title: t('features.unifiedDashboards'),
          description: t('features.unifiedDashboardsDesc'),
        },
        {
          icon: <Hospital className="h-8 w-8 text-primary" />,
          title: t('features.nearbyHospitals'),
          description: t('features.nearbyHospitalsDesc'),
        },
        {
          icon: <ShieldCheck className="h-8 w-8 text-primary" />,
          title: t('features.privacyCompliance'),
          description: t('features.privacyComplianceDesc'),
          className: 'md:col-span-3',
        },
      ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('features.title')}</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-balance">
            {t('features.subtitle')}
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
