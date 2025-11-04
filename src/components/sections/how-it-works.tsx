// @ts-nocheck
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, FileScan, PenSquare } from "lucide-react";
import { useTranslation } from "@/context/language-context";

export default function HowItWorks() {
    const { t } = useTranslation();

    const steps = [
        {
            icon: <PenSquare className="h-10 w-10 text-primary" />,
            title: t('howItWorks.step1Title'),
            description: t('howItWorks.step1Desc')
        },
        {
            icon: <Bot className="h-10 w-10 text-primary" />,
            title: t('howItWorks.step2Title'),
            description: t('howItWorks.step2Desc')
        },
        {
            icon: <FileScan className="h-10 w-10 text-primary" />,
            title: t('howItWorks.step3Title'),
            description: t('howItWorks.step3Desc')
        }
    ]

    return (
        <section className="py-20 md:py-28 bg-background/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('howItWorks.title')}</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-balance">
                        {t('howItWorks.subtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center flex flex-col items-center">
                            <div className="mb-6 p-4 bg-primary/10 rounded-full">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 font-headline">{step.title}</h3>
                            <p className="text-muted-foreground text-balance">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
