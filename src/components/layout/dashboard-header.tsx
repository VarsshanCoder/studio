"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import { useTranslation } from "@/context/language-context";

export default function DashboardHeader() {
    const { t } = useTranslation();
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            <div className="flex-1">
                {/* Search bar can go here */}
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">{t('dashboardHeader.toggleNotifications')}</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage data-ai-hint="person portrait" src="https://picsum.photos/seed/user/40/40" alt="User" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">{t('dashboardHeader.toggleUserMenu')}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('dashboardHeader.myAccount')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>{t('dashboardHeader.profile')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>{t('dashboardHeader.settings')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>{t('dashboardHeader.support')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>{t('dashboardHeader.logout')}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
