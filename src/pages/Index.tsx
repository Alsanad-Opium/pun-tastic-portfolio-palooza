import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { FakeCrashIntro } from '@/components/FakeCrashIntro';
import { FloatingJokes } from '@/components/FloatingJokes';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';

function PortfolioContent() {
  const [showIntro, setShowIntro] = useState(true);
  const { showShortcuts, setShowShortcuts } = useKeyboardShortcuts();

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
            
            {/* Placeholder for other sections */}
            <section id="skills" className="py-20 bg-gradient-subtle">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">⚡ Skills Coming Soon</h2>
                <p className="text-xl text-muted-foreground">Interactive skill badges with dad jokes coming up!</p>
              </div>
            </section>
            
            <section id="contact" className="py-20">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">📞 Contact Coming Soon</h2>
                <p className="text-xl text-muted-foreground">Fun contact form with rocket animations on the way!</p>
              </div>
            </section>
          </main>
          
          <FloatingJokes />
          <KeyboardShortcuts 
            isOpen={showShortcuts} 
            onClose={() => setShowShortcuts(false)} 
          />
        </>
      )}
    </div>
  );
}

const Index = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default Index;
