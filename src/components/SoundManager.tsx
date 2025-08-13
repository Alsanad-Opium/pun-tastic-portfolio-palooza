import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (soundType: 'click' | 'achievement' | 'error' | 'launch') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(false); // Default to muted for accessibility
  
  // Simple sound synthesis using Web Audio API
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (isMuted) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.log('Web Audio not supported');
    }
  };

  const playSound = (soundType: 'click' | 'achievement' | 'error' | 'launch') => {
    switch (soundType) {
      case 'click':
        playTone(800, 0.1, 'square');
        break;
      case 'achievement':
        // Happy ascending chime
        playTone(523, 0.2); // C
        setTimeout(() => playTone(659, 0.2), 100); // E
        setTimeout(() => playTone(784, 0.3), 200); // G
        break;
      case 'error':
        playTone(200, 0.3, 'sawtooth');
        break;
      case 'launch':
        // Rocket launch sound
        playTone(100, 0.5, 'sawtooth');
        setTimeout(() => playTone(200, 0.3), 200);
        setTimeout(() => playTone(400, 0.2), 400);
        break;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
      <SoundToggle />
    </SoundContext.Provider>
  );
}

function SoundToggle() {
  const { isMuted, toggleMute } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 left-4 z-40"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-background/80 backdrop-blur-sm"
        title={isMuted ? 'Enable sounds' : 'Disable sounds'}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </motion.div>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}