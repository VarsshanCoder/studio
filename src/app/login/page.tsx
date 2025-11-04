// @ts-nocheck
'use client';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HeartPulse } from "lucide-react"
import { useTranslation } from "@/context/language-context";

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background light-rays">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            {t('loginPage.title')}
          </CardTitle>
          <CardDescription>
            {t('loginPage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('loginPage.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('loginPage.passwordLabel')}</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  {t('loginPage.forgotPassword')}
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t('loginPage.loginButton')}
            </Button>
            <Button variant="outline" className="w-full">
              {t('loginPage.loginWithGoogle')}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t('loginPage.noAccount')}{" "}
            <Link href="#" className="underline">
              {t('loginPage.signUp')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
