import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  checkAchievement: (id: string) => boolean;
  addJokeClick: () => void;
  addRageClick: (element: string) => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-joke',
    title: 'First Laugh',
    description: 'Clicked your first floating joke!',
    icon: '😂',
    unlocked: false,
  },
  {
    id: 'joke-collector',
    title: 'Joke Collector',
    description: 'Clicked 10 floating jokes',
    icon: '🎭',
    unlocked: false,
  },
  {
    id: 'skill-explorer',
    title: 'Skill Explorer',
    description: 'Discovered 5 skill jokes',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'easter-egg-hunter',
    title: 'Easter Egg Hunter',
    description: 'Found a hidden secret',
    icon: '🥚',
    unlocked: false,
  },
  {
    id: 'theme-switcher',
    title: 'Style Master',
    description: 'Tried all three themes',
    icon: '🎨',
    unlocked: false,
  },
  {
    id: 'keyboard-ninja',
    title: 'Keyboard Ninja',
    description: 'Used keyboard shortcuts',
    icon: '⌨️',
    unlocked: false,
  },
  {
    id: 'rage-clicker',
    title: 'Rage Clicker',
    description: 'Clicked the same button 10 times',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'button-whisperer',
    title: 'Button Whisperer',
    description: 'Caught the runaway button',
    icon: '🏃‍♂️',
    unlocked: false,
  },
  {
    id: 'party-animal',
    title: 'Party Animal',
    description: 'Triggered party mode',
    icon: '🎉',
    unlocked: false,
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Unlocked all achievements',
    icon: '👑',
    unlocked: false,
  },
];

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

interface AchievementProviderProps {
  children: ReactNode;
}

export function AchievementProvider({ children }: AchievementProviderProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('portfolio-achievements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return defaultAchievements.map(defaultAch => {
          const savedAch = parsed.find((a: Achievement) => a.id === defaultAch.id);
          return savedAch ? { ...defaultAch, ...savedAch } : defaultAch;
        });
      } catch {
        return defaultAchievements;
      }
    }
    return defaultAchievements;
  });

  const [jokeClickCount, setJokeClickCount] = useState(0);
  const [rageClickCounts, setRageClickCounts] = useState<Record<string, number>>({});
  const { toast } = useToast();

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Check for completionist achievement
  useEffect(() => {
    const unlockedCount = achievements.filter(a => a.unlocked && a.id !== 'completionist').length;
    const totalCount = achievements.filter(a => a.id !== 'completionist').length;
    
    if (unlockedCount === totalCount && !checkAchievement('completionist')) {
      unlockAchievement('completionist');
    }
  }, [achievements]);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const updated = prev.map(achievement => 
        achievement.id === id && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      );
      
      const achievement = updated.find(a => a.id === id);
      if (achievement && !prev.find(a => a.id === id)?.unlocked) {
        // Show achievement toast
        toast({
          title: `🏆 Achievement Unlocked!`,
          description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
          duration: 5000,
        });
      }
      
      return updated;
    });
  };

  const checkAchievement = (id: string): boolean => {
    return achievements.find(a => a.id === id)?.unlocked || false;
  };

  const addJokeClick = () => {
    const newCount = jokeClickCount + 1;
    setJokeClickCount(newCount);
    
    if (newCount === 1 && !checkAchievement('first-joke')) {
      unlockAchievement('first-joke');
    }
    
    if (newCount === 10 && !checkAchievement('joke-collector')) {
      unlockAchievement('joke-collector');
    }
  };

  const addRageClick = (element: string) => {
    const newCounts = { ...rageClickCounts };
    newCounts[element] = (newCounts[element] || 0) + 1;
    setRageClickCounts(newCounts);
    
    if (newCounts[element] === 10 && !checkAchievement('rage-clicker')) {
      unlockAchievement('rage-clicker');
      toast({
        title: "🤯 Calm down there!",
        description: "I'm sensitive! But... achievement unlocked! 🏆",
        duration: 4000,
      });
    } else if (newCounts[element] > 5 && newCounts[element] < 10) {
      toast({
        title: "😅 Easy there!",
        description: "I'm getting dizzy from all this clicking!",
        duration: 2000,
      });
    }
  };

  return (
    <AchievementContext.Provider value={{
      achievements,
      unlockAchievement,
      checkAchievement,
      addJokeClick,
      addRageClick,
    }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
}

// Achievement Progress Component
export function AchievementProgress() {
  const { achievements } = useAchievements();
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg z-40"
    >
      <div className="text-sm font-medium mb-1">Achievements</div>
      <div className="text-xs text-muted-foreground">
        {unlockedCount}/{totalCount} unlocked
      </div>
      <div className="w-24 h-2 bg-muted rounded-full mt-2 overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}