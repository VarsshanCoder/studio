'use client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';
import { useTranslation } from '@/context/language-context';
import { VoicePlayer } from '@/components/common/voice-player';

export default function DashboardInfoPage() {
  const { t } = useTranslation();

  const getPageContent = () => {
    return `
      ${t('dashboardInfoPage.cardTitle')}.
      ${t('dashboardInfoPage.mainContent')}.
      ${t('dashboardInfoPage.forPatientsTitle')}.
      ${t('dashboardInfoPage.forPatientsContent')}.
      ${t('dashboardInfoPage.forDoctorsTitle')}.
      ${t('dashboardInfoPage.forDoctorsContent')}.
      ${t('dashboardInfoPage.forAdminsTitle')}.
      ${t('dashboardInfoPage.forAdminsContent')}.
    `;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">{t('dashboardInfoPage.title')}</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
              {t('dashboardInfoPage.subtitle')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard /> {t('dashboardInfoPage.cardTitle')}
                </CardTitle>
                 <VoicePlayer text={getPageContent} />
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  {t('dashboardInfoPage.mainContent')}
                </p>
                <h3 className="font-semibold text-foreground pt-4">{t('dashboardInfoPage.forPatientsTitle')}</h3>
                <p>
                  {t('dashboardInfoPage.forPatientsContent')}
                </p>
                <h3 className="font-semibold text-foreground pt-4">{t('dashboardInfoPage.forDoctorsTitle')}</h3>
                <p>
                  {t('dashboardInfoPage.forDoctorsContent')}
                </p>
                 <h3 className="font-semibold text-foreground pt-4">{t('dashboardInfoPage.forAdminsTitle')}</h3>
                <p>
                  {t('dashboardInfoPage.forAdminsContent')}
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
