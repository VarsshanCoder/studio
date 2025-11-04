// @ts-nocheck
'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Stethoscope } from "lucide-react"
import { useTranslation } from "@/context/language-context";

export default function SymptomTriagePage() {
  const { t, language, setLanguage } = useTranslation();
  return (
    <Card className="w-full max-w-2xl">
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
          <Textarea id="symptoms" placeholder={t('symptomTriagePage.symptomsPlaceholder')} className="min-h-[120px]" />
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
                <Input id="age" type="number" placeholder={t('symptomTriagePage.agePlaceholder')} />
            </div>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="consent" />
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
        <Button className="w-full">{t('symptomTriagePage.getAnalysisButton')}</Button>
      </CardFooter>
    </Card>
  )
}
