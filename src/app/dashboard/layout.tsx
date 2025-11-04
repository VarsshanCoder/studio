// @ts-nocheck
'use client';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import DashboardHeader from '@/components/layout/dashboard-header';
import { Home, Stethoscope, FileText, Hospital, HeartPulse, LogOut, FileHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { t } = useTranslation();
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
                AarogyamAI
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard" tooltip={t('dashboardLayout.dashboard')} isActive>
                  <Home />
                  <span>{t('dashboardLayout.dashboard')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/triage/symptoms" tooltip={t('dashboardLayout.symptomTriage')}>
                  <Stethoscope />
                  <span>{t('dashboardLayout.symptomTriage')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/triage/image" tooltip={t('dashboardLayout.imageDiagnosis')}>
                  <FileText />
                  <span>{t('dashboardLayout.imageDiagnosis')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/triage/x-ray" tooltip={t('dashboardLayout.xrayDiagnosis')}>
                    <FileHeart />
                    <span>{t('dashboardLayout.xrayDiagnosis')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/hospitals" tooltip={t('dashboardLayout.findHospitals')}>
                  <Hospital />
                  <span>{t('dashboardLayout.findHospitals')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/login" tooltip={t('dashboardLayout.logout')}>
                        <LogOut />
                        <span>{t('dashboardLayout.logout')}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <DashboardHeader />
          <main className="p-4 lg:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
