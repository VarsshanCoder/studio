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
import { ScanLine, UploadCloud, Loader2, BrainCircuit } from "lucide-react";
import { VoiceInput } from "@/components/common/voice-input";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { imageBasedDiagnosis, type ImageBasedDiagnosisOutput } from "@/ai/flows/image-based-diagnosis";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VoicePlayer } from "@/components/common/voice-player";


export default function ImageDiagnosisPage() {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [region, setRegion] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageBasedDiagnosisOutput | null>(null);
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
    if (!imageDataUri || !age || !sex || !region || !consent) {
        toast({
            variant: "destructive",
            title: t('imageDiagnosisPage.validationErrorTitle'),
            description: t('imageDiagnosisPage.validationErrorDesc'),
        });
        return;
    }
    setLoading(true);
    setResult(null);
    setProgress(0);
    try {
        const response = await imageBasedDiagnosis({
            imageDataUri,
            age: parseInt(age),
            sex,
            region,
            symptoms,
        });
        setResult(response);
    } catch (error) {
        console.error("Image diagnosis failed:", error);
        toast({
            variant: "destructive",
            title: t('imageDiagnosisPage.analysisErrorTitle'),
            description: t('imageDiagnosisPage.analysisErrorDesc'),
        });
    } finally {
        setLoading(false);
    }
  };

  const getSeverityVariant = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild':
        return 'default';
      case 'moderate':
        return 'secondary';
      case 'severe':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  const getConfidenceBarColor = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild':
        return 'bg-blue-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'severe':
        return 'bg-red-500';
      default:
        return 'bg-primary';
    }
  }

  const getResultAsText = () => {
    if (!result) return '';
    const isTamil = language === 'ta';
    return `
      ${t('imageDiagnosisPage.analysisResultTitle')}.
      ${t('imageDiagnosisPage.diagnosisLabel')}: ${(isTamil ? result.diagnosisTa : result.diagnosis).join(', ')}.
      ${t('imageDiagnosisPage.severityLabel')}: ${t(`imageDiagnosisPage.severity.${result.severity}`)}.
      ${t('imageDiagnosisPage.recommendationsLabel')}: ${(isTamil ? result.recommendationsTa : result.recommendations).join(', ')}.
      ${t('imageDiagnosisPage.followUpLabel')}: ${(isTamil ? result.followUpTa : result.followUp).join(', ')}.
      ${t('imageDiagnosisPage.explanationLabel')}: ${isTamil ? result.explanationTa : result.explanationEn}.
    `;
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
    <Card>
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
                        {fileName ? (
                              <p className="font-semibold text-primary">{fileName}</p>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('imageDiagnosisPage.uploadHint')}</span></p>
                              <p className="text-xs text-muted-foreground">{t('imageDiagnosisPage.uploadConstraints')}</p>
                            </>
                          )}
                    </div>
                    <Input ref={fileInputRef} id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                </label>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="age">{t('imageDiagnosisPage.ageLabel')}</Label>
                <Input id="age" type="number" placeholder={t('imageDiagnosisPage.agePlaceholder')} value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="sex">{t('imageDiagnosisPage.sexLabel')}</Label>
                <Input id="sex" placeholder={t('imageDiagnosisPage.sexPlaceholder')} value={sex} onChange={(e) => setSex(e.target.value)} />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="region">{t('imageDiagnosisPage.regionLabel')}</Label>
                <Input id="region" placeholder={t('imageDiagnosisPage.regionPlaceholder')} value={region} onChange={(e) => setRegion(e.target.value)} />
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
          <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(!!checked)} />
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
        <Button className="w-full" onClick={handleAnalysis} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? t('imageDiagnosisPage.analyzingButton') : t('imageDiagnosisPage.analyzeButton')}
        </Button>
      </CardFooter>
    </Card>

    {result && (
        <Card className="animate-blur-in">
          <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <BrainCircuit /> {t('imageDiagnosisPage.analysisResultTitle')}
                </CardTitle>
                <CardDescription>
                    {t('imageDiagnosisPage.analysisResultDesc')}
                </CardDescription>
            </div>
            <VoicePlayer text={getResultAsText} />
          </CardHeader>
          <CardContent className="space-y-6">
               <div className="space-y-2">
                  <h3 className="font-semibold">{t('imageDiagnosisPage.confidenceLabel')}</h3>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="w-full [&>div]:transition-all [&>div]:duration-500" indicatorClassName={getConfidenceBarColor(result.severity)} />
                    <span className="font-mono text-sm font-medium">{Math.round(result.confidence * 100)}%</span>
                  </div>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    {t('imageDiagnosisPage.severityLabel')}
                  </h3>
                  <Badge variant={getSeverityVariant(result.severity)} className="text-base">
                      {t(`imageDiagnosisPage.severity.${result.severity}`)}
                  </Badge>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('imageDiagnosisPage.diagnosisLabel')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {(language === 'ta' ? result.diagnosisTa : result.diagnosis).map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('imageDiagnosisPage.recommendationsLabel')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {(language === 'ta' ? result.recommendationsTa : result.recommendations).map((rec, index) => <li key={index}>{rec}</li>)}
                  </ul>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('imageDiagnosisPage.followUpLabel')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {(language === 'ta' ? result.followUpTa : result.followUp).map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
              </div>
               <div className="space-y-2">
                  <h3 className="font-semibold">{t('imageDiagnosisPage.explanationLabel')}</h3>
                  <p className="text-muted-foreground">{language === 'ta' ? result.explanationTa : result.explanationEn}</p>
              </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
