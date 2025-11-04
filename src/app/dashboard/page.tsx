// @ts-nocheck
'use client';
import Link from "next/link";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { FileText, Stethoscope, Calendar, Hospital, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/language-context";

export default function DashboardPage() {
    const { t } = useTranslation();
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">{t('dashboard.title')}</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SpotlightCard className="md:col-span-2 lg:col-span-3 p-6 flex flex-col justify-center">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-headline">{t('dashboard.welcome')}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-2">
                        <p className="text-muted-foreground">{t('dashboard.welcomeDesc')}</p>
                    </CardContent>
                </SpotlightCard>
                
                <Link href="/triage/symptoms" className="flex">
                    <SpotlightCard className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><Stethoscope/> {t('dashboard.symptomTriage')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{t('dashboard.symptomTriageDesc')}</p>
                            <Button>{t('dashboard.startTriage')} <ArrowRight className="ml-2 h-4 w-4"/></Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>

                <Link href="/triage/image" className="flex">
                    <SpotlightCard className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><FileText /> {t('dashboard.imageDiagnosis')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{t('dashboard.imageDiagnosisDesc')}</p>
                            <Button>{t('dashboard.uploadImage')} <ArrowRight className="ml-2 h-4 w-4"/></Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>

                <Link href="/dashboard/appointments" className="flex">
                    <SpotlightCard className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><Calendar /> {t('dashboard.appointments')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{t('dashboard.appointmentsDesc')}</p>
                            <Button variant="outline">{t('dashboard.viewAll')}</Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>
                
                <Link href="/hospitals" className="flex">
                    <SpotlightCard className="w-full lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><Hospital /> {t('dashboard.findHospitals')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{t('dashboard.findHospitalsDesc')}</p>
                            <Button variant="outline">{t('dashboard.searchNow')}</Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>
            </div>
        </div>
    )
}
