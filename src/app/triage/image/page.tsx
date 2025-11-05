// @ts-nocheck
'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/context/language-context";
import { ScanLine, UploadCloud } from "lucide-react";
import { VoiceInput } from "@/components/common/voice-input";
import { useState } from "react";

export default function ImageDiagnosisPage() {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState('');

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <ScanLine /> {t('imageDiagnosisPage.title')}
        </CardTitle>
        <CardDescription>
          {t('imageDiagnosisPage.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
            <Label htmlFor="image-upload">{t('imageDiagnosisPage.uploadLabel')}</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('imageDiagnosisPage.uploadHint')}</span></p>
                        <p className="text-xs text-muted-foreground">{t('imageDiagnosisPage.uploadConstraints')}</p>
                    </div>
                    <Input id="image-upload" type="file" className="hidden" />
                </label>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="age">{t('imageDiagnosisPage.ageLabel')}</Label>
                <Input id="age" type="number" placeholder={t('imageDiagnosisPage.agePlaceholder')} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="sex">{t('imageDiagnosisPage.sexLabel')}</Label>
                <Input id="sex" placeholder={t('imageDiagnosisPage.sexPlaceholder')} />
            </div>
        </div>
         <div className="grid gap-2">
          <Label htmlFor="symptoms">{t('imageDiagnosisPage.symptomsLabel')}</Label>
           <div className="relative">
            <Textarea 
              id="symptoms"
              placeholder={t('imageDiagnosisPage.symptomsPlaceholder')}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="pr-12"
            />
            <VoiceInput
              onTranscriptChange={(transcript) => setSymptoms(symptoms ? `${symptoms} ${transcript}`: transcript)}
              className="absolute right-2 top-2"
            />
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="consent" />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('imageDiagnosisPage.consentLabel')}
            </label>
            <p className="text-xs text-muted-foreground">
              {t('imageDiagnosisPage.consentDescription')}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{t('imageDiagnosisPage.analyzeButton')}</Button>
      </CardFooter>
    </Card>
  );
}
