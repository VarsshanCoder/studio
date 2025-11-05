'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2, Pause } from 'lucide-react';
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

  useEffect(() => {
    // Create audio element on mount
    audioRef.current = new Audio();
    audioRef.current.onended = () => setIsPlaying(false);

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // When language changes, stop and clear the audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      setIsPlaying(false);
    }
  }, [language]);


  const handlePlay = async () => {
    if (!audioRef.current) return;
    
    // Pause if playing
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // Resume if paused
    if (audioRef.current.src && audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // Fetch and play new audio
    setIsLoading(true);
    try {
      const textToSpeak = typeof text === 'function' ? text() : text;
      if (!textToSpeak.trim()) return;

      const response = await textToSpeech({
        text: textToSpeak,
        language: language,
      });

      if (response.audioDataUri) {
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
