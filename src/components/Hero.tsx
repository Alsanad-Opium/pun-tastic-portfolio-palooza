import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAchievements } from '@/components/AchievementSystem';
import { useSound } from '@/components/SoundManager';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, Coffee } from 'lucide-react';

export function Hero() {
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [dontClickCount, setDontClickCount] = useState(0);
  const { addRageClick } = useAchievements();
  const { toast } = useToast();
  const { playSound } = useSound();

  const texts = {
    light: "Hi! I'm Mohammad Alsanad, a developer who debugs with coffee ☕",
    'neon-hacker': "> console.log('Hacking reality with code...')",
    'punny-mode': "I'm not just coding, I'm Hakla-coding! 🎭"
  };

  const currentText = texts[theme];

  useEffect(() => {
    setTypedText('');
    let index = 0;
    const timer = setInterval(() => {
      if (index < currentText.length) {
        setTypedText(currentText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setShowEmojis(true);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentText]);

  const handleDontClick = () => {
    setDontClickCount(prev => prev + 1);
    addRageClick('hero-dont-click');
    playSound('click');
    const messages = [
      "I said don't click me! 😤",
      "Seriously, stop clicking! 🙄",
      "Fine... you win. Here's a cookie: 🍪",
      "You're persistent. I respect that! 🎉",
    ];
    const message = messages[Math.min(dontClickCount, messages.length - 1)];
    toast({ title: '😅 Hey!', description: message, duration: 2000 });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-secondary/10"
        />
      </div>

      <div className="container mx-auto px-4 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className={`text-4xl md:text-6xl font-bold ${
            theme === 'neon-hacker' ? 'neon-glow font-mono' : 
            theme === 'punny-mode' ? 'font-comic wobble' : ''
          }`}>
            {theme === 'punny-mode' ? '🎪 Welcome to the Code Circus!' : 
             theme === 'neon-hacker' ? '< REALITY.EXE />' : 
             'Full Stack Developer'}
          </h1>

          <div className="min-h-[80px] flex items-center justify-center">
            <p className={`text-xl md:text-2xl ${
              theme === 'neon-hacker' ? 'neon-glow-secondary font-mono' : 
              theme === 'punny-mode' ? 'font-baloo' : ''
            }`}>
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-1"
              >
                |
              </motion.span>
            </p>
          </div>

          {/* Floating Emojis */}
          <AnimatePresence>
            {showEmojis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center space-x-4"
              >
                {['💻', '☕', '🚀', '🎯', '⚡'].map((emoji, index) => (
                  <motion.span
                    key={emoji}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-3xl float"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className={`${
                theme === 'neon-hacker' ? 'neon-border' : 
                theme === 'punny-mode' ? 'wobble' : ''
              } hover:scale-105 transition-transform`}
            >
              {theme === 'punny-mode' ? '🔍 Explore My Puns' : 
               theme === 'neon-hacker' ? '> EXECUTE_EXPLORE' : 
               'Explore My Work'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleDontClick}
              className="hover:scale-105 transition-transform border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Don't Click Me! 🚫
            </Button>
          </div>

          {theme === 'light' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex items-center justify-center space-x-2 text-muted-foreground"
            >
              <Coffee className="h-4 w-4" />
              <span>Powered by coffee and curiosity</span>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}