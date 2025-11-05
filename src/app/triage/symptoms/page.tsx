{// @ts-nocheck
'use client';
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Stethoscope, BrainCircuit, AlertTriangle, Loader2 } from "lucide-react";
import { useTranslation } from "@/context/language-context";
import { symptomBasedTriage, type SymptomBasedTriageOutput } from "@/ai/flows/symptom-based-triage";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VoicePlayer } from "@/components/common/voice-player";
import { VoiceInput } from "@/components/common/voice-input";

export default function SymptomTriagePage() {
  const { t, language, setLanguage } = useTranslation();
  const { toast } = useToast();

  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomBasedTriageOutput | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setProgress(result.confidence * 100), 100);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleAnalysis = async () => {
    if (!symptoms || !age || !consent) {
        toast({
            variant: "destructive",
            title: t('symptomTriagePage.validationErrorTitle'),
            description: t('symptomTriagePage.validationErrorDesc'),
        });
        return;
    }
    setLoading(true);
    setResult(null);
    setProgress(0);
    try {
        const response = await symptomBasedTriage({
            symptoms,
            language,
        });
        setResult(response);
    } catch (error) {
        console.error("Symptom triage failed:", error);
        toast({
            variant: "destructive",
            title: t('symptomTriagePage.analysisErrorTitle'),
            description: t('symptomTriagePage.analysisErrorDesc'),
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
    return `
      ${t('symptomTriagePage.analysisResultTitle')}.
      ${t('symptomTriagePage.severityLabel')}: ${t(`symptomTriagePage.severity.${result.severity}`)}.
      ${t('symptomTriagePage.confidenceLabel')}: ${Math.round(result.confidence * 100)}%.
      ${t('symptomTriagePage.explanationLabel')}: ${result.explanation}.
      ${t('symptomTriagePage.recommendationsLabel')}: ${result.recommendations.join(', ')}.
    `;
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <Stethoscope /> {t('symptomTriagePage.title')}
          </CardTitle>
          <CardDescription>
            {t('symptomTriagePage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="symptoms">{t('symptomTriagePage.symptomsLabel')}</Label>
            <div className="relative">
              <Textarea 
                  id="symptoms" 
                  placeholder={t('symptomTriagePage.symptomsPlaceholder')} 
                  className="min-h-[120px] pr-12"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
              />
              <VoiceInput 
                onTranscriptChange={(transcript) => setSymptoms(symptoms ? `${symptoms} ${transcript}`: transcript)} 
                className="absolute right-2 top-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="language">{t('symptomTriagePage.languageLabel')}</Label>
                  <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ta')}>
                      <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="en">{t('symptomTriagePage.english')}</SelectItem>
                          <SelectItem value="ta">{t('symptomTriagePage.tamil')}</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="age">{t('symptomTriagePage.ageLabel')}</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    placeholder={t('symptomTriagePage.agePlaceholder')} 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
              </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox 
                id="consent" 
                checked={consent}
                onCheckedChange={(checked) => setConsent(!!checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('symptomTriagePage.consentLabel')}
              </label>
              <p className="text-xs text-muted-foreground">
                {t('symptomTriagePage.consentDescription')}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAnalysis} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? t('symptomTriagePage.analyzingButton') : t('symptomTriagePage.getAnalysisButton')}
            </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card className="animate-blur-in">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1.5">
              <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <BrainCircuit /> {t('symptomTriagePage.analysisResultTitle')}
              </CardTitle>
              <CardDescription>
                  {t('symptomTriagePage.analysisResultDesc')}
              </CardDescription>
            </div>
            <VoicePlayer text={getResultAsText} />
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle />
                    {t('symptomTriagePage.severityLabel')}
                  </h3>
                  <Badge variant={getSeverityVariant(result.severity)} className="text-base">
                      {t(`symptomTriagePage.severity.${result.severity}`)}
                  </Badge>
              </div>
               <div className="space-y-2">
                  <h3 className="font-semibold">{t('symptomTriagePage.confidenceLabel')}</h3>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="w-full [&>div]:transition-all [&>div]:duration-500" indicatorClassName={getConfidenceBarColor(result.severity)} />
                    <span className="font-mono text-sm font-medium">{Math.round(result.confidence * 100)}%</span>
                  </div>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('symptomTriagePage.explanationLabel')}</h3>
                  <p className="text-muted-foreground">{result.explanation}</p>
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold">{t('symptomTriagePage.recommendationsLabel')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                  </ul>
              </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
