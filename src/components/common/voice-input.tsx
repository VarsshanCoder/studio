// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

interface VoiceInputProps {
  onTranscriptChange: (transcript: string) => void;
  className?: string;
}

export function VoiceInput({ onTranscriptChange, className }: VoiceInputProps) {
  const { language } = useTranslation();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);

  const SpeechRecognition =
    typeof window !== 'undefined'
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null;

  useEffect(() => {
    if (!SpeechRecognition) {
      setIsAvailable(false);
    } else {
        const recognition = new SpeechRecognition();
        setIsAvailable(true);
    }
    setIsChecking(false);
  }, [SpeechRecognition]);


  const handleToggleRecording = () => {
    if (!isAvailable) {
        toast({
            variant: 'destructive',
            title: "Voice input not available",
            description: "Your browser does not support speech recognition."
        });
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscriptChange(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        toast({
          variant: 'destructive',
          title: 'Microphone Access Denied',
          description: "Please enable microphone permissions in your browser's site settings to use voice input.",
        });
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        toast({
          variant: 'destructive',
          title: 'Voice recognition error',
          description: `An error occurred: ${event.error}. Please try again.`,
        });
      }
      setIsRecording(false);
    };
    
    recognition.onend = () => {
        setIsRecording(false);
    }
  };
  
  if (isChecking) {
      return <Button variant="ghost" size="icon" className={className} disabled><Loader2 className="animate-spin" /></Button>
  }

  if (!isAvailable) {
      return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggleRecording}
      className={className}
      aria-label="Toggle voice input"
    >
      {isRecording ? <MicOff className="text-destructive" /> : <Mic />}
    </Button>
  );
}
