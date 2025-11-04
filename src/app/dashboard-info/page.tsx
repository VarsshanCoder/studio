
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardInfoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Unified Dashboards</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
              Separate, role-based views for patients, doctors, and admins.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard /> A Central Hub for Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The AarogyamAI platform is designed with different users in mind. Our unified dashboard system provides specific views and tools for patients, doctors, and healthcare administrators to ensure a seamless and efficient experience for everyone.
                </p>
                <h3 className="font-semibold text-foreground pt-4">For Patients:</h3>
                <p>
                  Easily track your health history, view past analysis results, manage appointments, and access personalized educational content. Your patient dashboard is your personal health command center.
                </p>
                <h3 className="font-semibold text-foreground pt-4">For Doctors:</h3>
                <p>
                  Access patient-submitted data (with consent), review AI-assisted analyses, manage consultation schedules, and communicate securely with patients. The doctor's dashboard is designed to streamline workflows and improve diagnostic efficiency.
                </p>
                 <h3 className="font-semibold text-foreground pt-4">For Admins:</h3>
                <p>
                  Oversee hospital or clinic operations, manage doctor and patient records, and view anonymized health data analytics to understand community health trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
