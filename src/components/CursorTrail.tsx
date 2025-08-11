import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface CursorTrailProps {
  enabled: boolean;
}

export function CursorTrail({ enabled }: CursorTrailProps) {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!enabled) {
      setParticles([]);
      return;
    }

    let animationFrame: number;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: TrailParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setParticles(prev => {
        const filtered = prev.filter(p => Date.now() - p.timestamp < 1000);
        return [...filtered, newParticle];
      });
    };

    const cleanup = () => {
      animationFrame = requestAnimationFrame(() => {
        setParticles(prev => prev.filter(p => Date.now() - p.timestamp < 1000));
        cleanup();
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    cleanup();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  const getParticleEmoji = () => {
    if (theme === 'neon-hacker') return '💫';
    if (theme === 'punny-mode') return '🎉';
    return '✨';
  };

  const getParticleColor = () => {
    if (theme === 'neon-hacker') return 'text-neon-green';
    if (theme === 'punny-mode') return 'text-mango';
    return 'text-primary';
  };

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => {
          const age = Date.now() - particle.timestamp;
          const opacity = Math.max(0, 1 - age / 1000);
          
          return (
            <motion.div
              key={particle.id}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`absolute text-lg ${getParticleColor()}`}
              style={{
                left: particle.x - 10,
                top: particle.y - 10,
                opacity,
              }}
            >
              {getParticleEmoji()}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}