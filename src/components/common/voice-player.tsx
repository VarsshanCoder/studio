// @ts-nocheck
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2, Play, Pause } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useTranslation } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';

interface VoicePlayerProps {
  text: string | (() => string);
  className?: string;
}

export function VoicePlayer({ text, className }: VoicePlayerProps) {
  const { language } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    
    if (audioRef.current && audioRef.current.src) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
    }

    setIsLoading(true);
    try {
      const textToSpeak = typeof text === 'function' ? text() : text;
      if (!textToSpeak) return;

      const response = await textToSpeech({
        text: textToSpeak,
        language: language,
      });

      if (response.audioDataUri) {
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.onended = () => setIsPlaying(false);
        }
        audioRef.current.src = response.audioDataUri;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('TTS failed:', error);
      toast({
        variant: 'destructive',
        title: 'Audio failed',
        description: 'Could not generate audio for this content.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getButtonIcon = () => {
    if (isLoading) return <Loader2 className="animate-spin" />;
    if (isPlaying) return <Pause />;
    return <Volume2 />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePlay}
      className={className}
      aria-label="Listen to content"
    >
      {getButtonIcon()}
    </Button>
  );
}
