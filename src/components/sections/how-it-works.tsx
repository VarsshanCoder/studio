import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, FileScan, PenSquare } from "lucide-react";

const steps = [
    {
        icon: <PenSquare className="h-10 w-10 text-primary" />,
        title: "1. Describe or Upload",
        description: "Tell us your symptoms in your own words, or upload a clear photo of the condition."
    },
    {
        icon: <Bot className="h-10 w-10 text-primary" />,
        title: "2. AI Analysis",
        description: "Our advanced AI models analyze the information to identify potential conditions and assess severity."
    },
    {
        icon: <FileScan className="h-10 w-10 text-primary" />,
        title: "3. Get Recommendations",
        description: "Receive clear, actionable next steps, from home remedies to booking a doctor's appointment."
    }
]

export default function HowItWorks() {
    return (
        <section className="py-20 md:py-28 bg-background/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Simple Steps to Better Health</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-balance">
                        Getting started with AarogyamAI is easy, fast, and secure.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center flex flex-col items-center">
                            <div className="mb-6 p-4 bg-primary/10 rounded-full">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 font-headline">{step.title}</h3>
                            <p className="text-muted-foreground text-balance">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
