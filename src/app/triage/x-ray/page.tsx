{// @ts-nocheck
'use client';
import { useState, useRef, useEffect } from "react";
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
import { UploadCloud, FileHeart, Loader2, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { xrayDiagnosis, type XrayDiagnosisOutput } from "@/ai/flows/xray-diagnosis";
import { Progress } from "@/components/ui/progress";
import { VoicePlayer } from "@/components/common/voice-player";
import { VoiceInput } from "@/components/common/voice-input";

export default function XrayDiagnosisPage() {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<XrayDiagnosisOutput | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setProgress(result.confidence * 100), 100);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageDataUri(e.target?.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!imageDataUri || !age || !sex || !consent) {
        toast({
            variant: "destructive",
            title: t('xrayDiagnosisPage.validationErrorTitle'),
            description: t('xrayDiagnosisPage.validationErrorDesc'),
        });
        return;
    }
    setLoading(true);
    setResult(null);
    setProgress(0);
    try {
        const response = await xrayDiagnosis({
            imageDataUri,
            age: parseInt(age),
            sex,
            symptoms,
        });
        setResult(response);
    } catch (error) {
        console.error("X-ray diagnosis failed:", error);
        toast({
            variant: "destructive",
            title: t('xrayDiagnosisPage.analysisErrorTitle'),
            description: t('xrayDiagnosisPage.analysisErrorDesc'),
        });
    } finally {
        setLoading(false);
    }
  };
  
  const getConfidenceBarColor = (confidence: number) => {
    if (confidence < 0.5) return 'bg-red-500';
    if (confidence < 0.8) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  const getResultAsText = () => {
    if (!result) return '';
    const isTamil = language === 'ta';
    return `
      ${t('xrayDiagnosisPage.analysisResultTitle')}.
      ${t('xrayDiagnosisPage.impressionLabel')}: ${isTamil ? result.impressionTa : result.impression}.
      ${t('xrayDiagnosisPage.findingsLabel')}: ${(isTamil ? result.findingsTa : result.findings).join(', ')}.
      ${t('xrayDiagnosisPage.recommendationsLabel')}: ${(isTamil ? result.recommendationsTa : result.recommendations).join(', ')}.
      ${t('xrayDiagnosisPage.explanationLabel')}: ${isTamil ? result.explanationTa : result.explanationEn}.
    `;
  };


  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <FileHeart /> {t('xrayDiagnosisPage.title')}
          </CardTitle>
          <CardDescription>
            {t('xrayDiagnosisPage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
              <Label htmlFor="xray-upload">{t('xrayDiagnosisPage.uploadLabel')}</Label>
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="xray-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                          {fileName ? (
                              <p className="font-semibold text-primary">{fileName}</p>
                          ) : (
                            <>
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('xrayDiagnosisPage.uploadHint')}</span></p>
                                <p className="text-xs text-muted-foreground">{t('xrayDiagnosisPage.uploadConstraints')}</p>
                            </>
                          )}
                      </div>
                      <Input ref={fileInputRef} id="xray-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                  </label>
              </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="age">{t('xrayDiagnosisPage.ageLabel')}</Label>
                  <Input id="age" type="number" placeholder={t('xrayDiagnosisPage.agePlaceholder')} value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="sex">{t('xrayDiagnosisPage.sexLabel')}</Label>
                  <Input id="sex" placeholder={t('xrayDiagnosisPage.sexPlaceholder')} value={sex} onChange={e => setSex(e.target.value)} />
              </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="symptoms">{t('xrayDiagnosisPage.symptomsLabel')}</Label>
            <div className="relative">
              <Textarea 
                id="symptoms"
                placeholder={t('xrayDiagnosisPage.symptomsPlaceholder')}
                value={symptoms} 
                onChange={e => setSymptoms(e.target.value)}
                className="pr-12"
              />
               <VoiceInput
                onTranscriptChange={(transcript) => setSymptoms(symptoms ? `${symptoms} ${transcript}`: transcript)}
                className="absolute right-2 top-2"
              />
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(!!checked)} />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('xrayDiagnosisPage.consentLabel')}
              </label>
              <p className="text-xs text-muted-foreground">
                {t('xrayDiagnosisPage.consentDescription')}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAnalysis} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? t('xrayDiagnosisPage.analyzingButton') : t('xrayDiagnosisPage.analyzeButton')}
            </Button>
        </CardFooter>
      </Card>
      
       {result && (
        <Card className="animate-blur-in">
          <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <BrainCircuit /> {t('xrayDiagnosisPage.analysisResultTitle')}
                </CardTitle>
                <CardDescription>
                    {t('xrayDiagnosisPage.analysisResultDesc')}
                </CardDescription>
            </div>
            <VoicePlayer text={getResultAsText} />
          </CardHeader>
          <CardContent className="space-y-6">
               <div className="space-y-2">
                  <h3 className="font-semibold">{t('xrayDiagnosisPage.confidenceLabel')}</h3>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="w-full [&>div]:transition-all [&>div]:duration-500" indicatorClassName={getConfidenceBarColor(result.confidence)} />
                    <span className="font-mono text-sm font-medium">{Math.round(result.confidence * 100)}%</span>
                  </div>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('xrayDiagnosisPage.impressionLabel')}</h3>
                  <p className="text-muted-foreground">{language === 'ta' ? result.impressionTa : result.impression}</p>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('xrayDiagnosisPage.findingsLabel')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {(language === 'ta' ? result.findingsTa : result.findings).map((finding, index) => <li key={index}>{finding}</li>)}
                  </ul>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('xrayDiagnosisPage.recommendationsLabel')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {(language === 'ta' ? result.recommendationsTa : result.recommendations).map((rec, index) => <li key={index}>{rec}</li>)}
                  </ul>
              </div>
               <div className="space-y-2">
                  <h3 className="font-semibold">{t('xrayDiagnosisPage.explanationLabel')}</h3>
                  <p className="text-muted-foreground">{language === 'ta' ? result.explanationTa : result.explanationEn}</p>
              </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
