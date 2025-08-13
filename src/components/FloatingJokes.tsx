import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useAchievements } from '@/components/AchievementSystem';
import { useToast } from '@/hooks/use-toast';

// Local analytics store (privacy-friendly, local only)
const ANALYTICS_STORAGE_KEY = 'joke-click-analytics';

interface FloatingJoke {
  id: number;
  x: number;
  y: number;
  joke: string;
  emoji: string;
}

export function FloatingJokes() {
  const [floatingJokes, setFloatingJokes] = useState<FloatingJoke[]>([]);
  const [selectedJoke, setSelectedJoke] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [jokes, setJokes] = useState<string[]>([]);
  const { addJokeClick } = useAchievements();
  const { toast } = useToast();

  // Load jokes from JSON so they can be edited without code changes
  useEffect(() => {
    let isMounted = true;
    fetch('/assets/jokes.json')
      .then(res => res.ok ? res.json() : [])
      .then((data: string[]) => {
        if (isMounted && Array.isArray(data) && data.length > 0) setJokes(data);
      })
      .catch(() => {
        // Fallback to built-in jokes if the file isn't found
        setJokes([
          "I would tell you a UDP joke... but you might not get it. 📡",
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
          "I'm not lazy, I'm just in energy-saving mode! ⚡",
          "There are 10 types of people: those who understand binary and those who don't. 🤖",
          "Why did the developer go broke? Because he used up all his cache! 💰",
          "I put the 'fun' in function! 🎉",
          "404: Joke not found... just kidding! 😄",
        ]);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    // Create initial floating jokes
    if (jokes.length === 0) return;
    const initialJokes = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      joke: jokes[Math.floor(Math.random() * jokes.length)],
      emoji: ['😂', '🤪', '🎭', '🚀', '⭐', '🎪'][Math.floor(Math.random() * 6)]
    }));

    setFloatingJokes(initialJokes);
  }, [jokes]);

  useEffect(() => {
    // Spawn new joke every 10 seconds
    const interval = setInterval(() => {
      if (floatingJokes.length < 5 && jokes.length > 0) {
        const newJoke: FloatingJoke = {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100),
          joke: jokes[Math.floor(Math.random() * jokes.length)],
          emoji: ['😂', '🤪', '🎭', '🚀', '⭐', '🎪'][Math.floor(Math.random() * 6)]
        };
        setFloatingJokes(prev => [...prev, newJoke]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [floatingJokes.length, jokes]);

  const handleJokeClick = (joke: FloatingJoke) => {
    setSelectedJoke(joke.joke);
    setClickCount(prev => prev + 1);
    addJokeClick();
    // Local analytics
    try {
      const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      const stats: Record<string, number> = raw ? JSON.parse(raw) : {};
      stats[joke.joke] = (stats[joke.joke] || 0) + 1;
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Analytics failed, continue without breaking the app
    }
    
    // Remove the clicked joke and create a new one
    setFloatingJokes(prev => prev.filter(j => j.id !== joke.id));
    
    // Fun effect when joke clicked
    toast({ title: '😂 Good one!', description: 'Click more for surprises...', duration: 1500 });

    // Respawn a new joke after a delay
    setTimeout(() => {
      if (jokes.length === 0) return;
      const newJoke: FloatingJoke = {
        id: Date.now() + Math.random(),
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        joke: jokes[Math.floor(Math.random() * jokes.length)],
        emoji: ['😂', '🤪', '🎭', '🚀', '⭐', '🎪'][Math.floor(Math.random() * 6)]
      };
      setFloatingJokes(prev => [...prev, newJoke]);
    }, 2000);
  };

  return (
    <>
      {/* Floating Joke Buttons */}
      <AnimatePresence>
        {floatingJokes.map((joke) => (
          <motion.div
            key={joke.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [joke.x, joke.x + 50, joke.x - 30, joke.x + 20, joke.x],
              y: [joke.y, joke.y - 30, joke.y + 20, joke.y - 10, joke.y]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 0.5,
              x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 25, repeat: Infinity, ease: "easeInOut" }
            }}
            className="fixed z-30 pointer-events-auto"
            style={{ left: joke.x, top: joke.y }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleJokeClick(joke)}
              className="rounded-full w-16 h-16 text-2xl hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
            >
              {joke.emoji}
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Joke Modal */}
      <AnimatePresence>
        {selectedJoke && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedJoke(null)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="max-w-md mx-auto p-6 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedJoke(null)}
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="text-center space-y-4">
                  <div className="text-4xl">😂</div>
                  <p className="text-lg font-medium leading-relaxed">
                    {selectedJoke}
                  </p>
                  <Button 
                    onClick={() => setSelectedJoke(null)}
                    className="mt-4"
                  >
                    Ha! Got me! 🎯
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}