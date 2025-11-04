import Link from "next/link";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { FileText, Stethoscope, Calendar, Hospital, ArrowRight } from "lucide-react";

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SpotlightCard className="md:col-span-2 lg:col-span-3 p-6 flex flex-col justify-center">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-headline">Welcome back!</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-2">
                        <p className="text-muted-foreground">Here's a quick overview of your health dashboard. Ready to get started?</p>
                    </CardContent>
                </SpotlightCard>
                
                <Link href="/triage/symptoms" className="flex">
                    <SpotlightCard className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><Stethoscope/> Symptom Triage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Describe your symptoms to get an AI-powered triage assessment.</p>
                            <Button>Start Triage <ArrowRight className="ml-2 h-4 w-4"/></Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>

                <Link href="/triage/image" className="flex">
                    <SpotlightCard className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><FileText /> Image Diagnosis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Upload an image of your condition for a quick analysis.</p>
                            <Button>Upload Image <ArrowRight className="ml-2 h-4 w-4"/></Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>

                <Link href="/dashboard/appointments" className="flex">
                    <SpotlightCard className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><Calendar /> Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">You have 2 upcoming appointments.</p>
                            <Button variant="outline">View All</Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>
                
                <Link href="/hospitals" className="flex">
                    <SpotlightCard className="w-full lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-headline"><Hospital /> Find Hospitals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Find nearby hospitals and clinics in Tamil Nadu.</p>
                            <Button variant="outline">Search Now</Button>
                        </CardContent>
                    </SpotlightCard>
                </Link>
            </div>
        </div>
    )
}
