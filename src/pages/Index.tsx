import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useTheme } from '@/contexts/ThemeContext';
import { AchievementProvider, AchievementProgress } from '@/components/AchievementSystem';
import { SoundProvider } from '@/components/SoundManager';
import { CursorTrail } from '@/components/CursorTrail';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { FakeCrashIntro } from '@/components/FakeCrashIntro';
import { FloatingJokes } from '@/components/FloatingJokes';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { Resume } from '@/components/Resume';

function PortfolioContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [cursorTrailEnabled, setCursorTrailEnabled] = useState(true);
  const { showShortcuts, setShowShortcuts } = useKeyboardShortcuts();
  const { theme } = useTheme();

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="relative">
      {showIntro && <FakeCrashIntro onComplete={handleIntroComplete} />}
      
      {!showIntro && (
        <>
          <Navbar />
          <main className="relative">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Resume />
            <Contact />
          </main>
          
          <CursorTrail enabled={cursorTrailEnabled} />
          <FloatingJokes />
          <AchievementProgress />
          <KeyboardShortcuts 
            isOpen={showShortcuts} 
            onClose={() => setShowShortcuts(false)} 
          />
          {/* Subtle scanlines overlay in neon-hacker mode */}
          {theme === 'neon-hacker' && (
            <div className="fixed inset-0 pointer-events-none z-30 scanlines" />
          )}
        </>
      )}
    </div>
  );
}

const Index = () => {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AchievementProvider>
          <PortfolioContent />
        </AchievementProvider>
      </SoundProvider>
    </ThemeProvider>
  );
};

export default Index;
