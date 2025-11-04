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

export default function SymptomTriagePage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-headline">
          <Stethoscope /> Symptom Triage
        </CardTitle>
        <CardDescription>
          Describe your symptoms to get an AI-powered severity assessment and recommended next steps.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="symptoms">Describe your symptoms</Label>
          <Textarea id="symptoms" placeholder="e.g., I have a headache and a slight fever..." className="min-h-[120px]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="language">Preferred Language</Label>
                 <Select defaultValue="en">
                    <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Your age" />
            </div>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="consent" />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I consent to share my health details for AI analysis.
            </label>
            <p className="text-xs text-muted-foreground">
              I understand this is not a substitute for a professional medical diagnosis.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Analysis</Button>
      </CardFooter>
    </Card>
  )
}
