import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FakeCrashIntroProps {
  onComplete: () => void;
}

export function FakeCrashIntro({ onComplete }: FakeCrashIntroProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  const steps = [
    "🚀 Booting up comedy.exe...",
    "ERROR 404: My Motivation Not Found 😱",
    "💥 Server not functioning...",
    "🔍 Searching for caffeine...",
    "☕ Just kidding... I run on coffee and chaos!"
  ];

  useEffect(() => {
    if (isSkipped) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(onComplete, 1500);
      }
    }, currentStep === 1 ? 2000 : 1200); // Longer pause on error message

    return () => clearTimeout(timer);
  }, [currentStep, isSkipped, onComplete]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSkipped(true);
        onComplete();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      >
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl font-bold"
          >
            {steps[currentStep]}
          </motion.div>

          {currentStep === steps.length - 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSkip}
              className="opacity-70 hover:opacity-100"
            >
              Skip (ESC)
            </Button>
          </motion.div>
        </div>

        {/* Loading bar */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}