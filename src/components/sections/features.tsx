
// @ts-nocheck
'use client';
import { ShieldCheck, Hospital, LayoutDashboard, Bot } from 'lucide-react';
import { useTranslation } from '@/context/language-context';
import { SpotlightCard } from '../ui/spotlight-card';
import Link from 'next/link';

export default function FeaturesGrid() {
    const { t } = useTranslation();

    const features = [
        {
          icon: <Bot className="h-8 w-8 text-primary" />,
          title: t('features.actionableRecommendations'),
          description: t('features.actionableRecommendationsDesc'),
          href: '/recommendations',
        },
        {
          icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
          title: t('features.unifiedDashboards'),
          description: t('features.unifiedDashboardsDesc'),
          href: '/dashboard-info',
        },
        {
          icon: <Hospital className="h-8 w-8 text-primary" />,
          title: t('features.nearbyHospitals'),
          description: t('features.nearbyHospitalsDesc'),
          href: '/hospitals',
        },
        {
          icon: <ShieldCheck className="h-8 w-8 text-primary" />,
          title: t('features.privacyCompliance'),
          description: t('features.privacyComplianceDesc'),
          href: '#', // Or a dedicated privacy page
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
          {features.map((feature, index) => {
            const cardContent = (
              <div className="flex flex-col h-full">
                <div className="flex flex-row items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="font-headline text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
              </div>
            );

            if(feature.href === '#') {
                return (
                    <SpotlightCard key={index} className={`p-6 ${feature.className}`}>
                        {cardContent}
                    </SpotlightCard>
                )
            }
            
            return (
              <Link key={index} href={feature.href} className={`no-underline ${feature.className}`}>
                <SpotlightCard className="p-6 h-full">
                  {cardContent}
                </SpotlightCard>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
