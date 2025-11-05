{// @ts-nocheck
'use client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { useTranslation } from '@/context/language-context';
import { VoicePlayer } from '@/components/common/voice-player';

export default function RecommendationsPage() {
  const { t } = useTranslation();

  const getPageContent = () => {
    return `
      ${t('recommendationsPage.cardTitle')}.
      ${t('recommendationsPage.content1')}.
      ${t('recommendationsPage.content2')}.
      ${t('recommendationsPage.content3')}.
    `;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">{t('recommendationsPage.title')}</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
              {t('recommendationsPage.subtitle')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot /> {t('recommendationsPage.cardTitle')}
                </CardTitle>
                <VoicePlayer text={getPageContent} />
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  {t('recommendationsPage.content1')}
                </p>
                <p>
                  {t('recommendationsPage.content2')}
                </p>
                <p>
                  {t('recommendationsPage.content3')}
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
