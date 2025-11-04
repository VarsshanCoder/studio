import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListFilter, MapPin, Phone, Route } from 'lucide-react';
import { mockHospitals, type Hospital } from '@/lib/hospitals';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{hospital.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
            <MapPin className="h-4 w-4" /> {hospital.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{hospital.phone}</span>
            </div>
            <span>{hospital.distance} km away</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Separator />
        <div className="w-full flex justify-between items-center">
            <Badge variant={hospital.type === 'Public' ? 'default' : 'secondary'}>{hospital.type}</Badge>
            <Button variant="outline">
                <Route className="mr-2 h-4 w-4" />
                Get Directions
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function HospitalsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Find Hospitals Near You</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
              Search for hospitals and clinics across Tamil Nadu.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input placeholder="Search by hospital name or location..." className="flex-1" />
            <div className="flex gap-2">
                <Button variant="outline">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
                <Button>Search</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockHospitals.map(hospital => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
