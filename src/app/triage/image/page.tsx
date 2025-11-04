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
import { ScanLine, UploadCloud } from "lucide-react";

export default function ImageDiagnosisPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <ScanLine /> Image Diagnosis
        </CardTitle>
        <CardDescription>
          Upload a photo of a skin condition, wound, rash, dental, or eye problem for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
            <Label htmlFor="image-upload">Upload Image</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB)</p>
                    </div>
                    <Input id="image-upload" type="file" className="hidden" />
                </label>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="e.g. 35" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="sex">Sex</Label>
                <Input id="sex" placeholder="e.g. Male" />
            </div>
        </div>
         <div className="grid gap-2">
          <Label htmlFor="symptoms">Additional Symptoms (optional)</Label>
          <Textarea id="symptoms" placeholder="Describe any other symptoms you're experiencing..." />
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="consent" />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I consent to upload my images and share health details for AI analysis.
            </label>
            <p className="text-xs text-muted-foreground">
              I understand this is not a substitute for a professional medical diagnosis.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Analyze Image</Button>
      </CardFooter>
    </Card>
  );
}
