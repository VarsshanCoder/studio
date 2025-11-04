// @ts-nocheck
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartPulse, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/context/language-context';

export default function Header() {
  const { t, setLanguage } = useTranslation();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">AarogyamAI</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/triage/symptoms" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t('header.symptomTriage')}
          </Link>
          <Link href="/triage/image" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t('header.imageDiagnosis')}
          </Link>
           <Link href="/triage/x-ray" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t('header.xrayDiagnosis')}
          </Link>
          <Link href="/hospitals" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t('header.hospitals')}
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
                <span className="sr-only">{t('header.toggleLanguage')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>{t('languages.english')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ta')}>{t('languages.tamil')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href="/login">{t('header.login')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
