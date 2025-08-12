import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAchievements } from '@/components/AchievementSystem';

export function useKeyboardShortcuts() {
  const { theme, setTheme, triggerGrayscale, triggerPartyMode } = useTheme();
  const { unlockAchievement } = useAchievements();
  const [pCount, setPCount] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    let pTimeout: ReturnType<typeof setTimeout> | undefined;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input field
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key.toLowerCase();
      switch (key) {
        case 'p':
          setPCount(prev => prev + 1);
          if (pTimeout) clearTimeout(pTimeout);
          pTimeout = setTimeout(() => setPCount(0), 1000);
          
          if (pCount === 2) { // Third 'p' press
            // Toggle Punny Mode
            setTheme(theme === 'punny-mode' ? 'light' : 'punny-mode');
            unlockAchievement('keyboard-ninja');
            setPCount(0);
          }
          break;
          
        case 'f':
          triggerGrayscale();
          unlockAchievement('keyboard-ninja');
          break;
          
        case 'l':
          triggerPartyMode();
          unlockAchievement('keyboard-ninja');
          unlockAchievement('party-animal');
          break;
          
        case '?':
          setShowShortcuts(true);
          unlockAchievement('keyboard-ninja');
          break;
          
        case 'escape':
          setShowShortcuts(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(pTimeout);
    };
  }, [pCount, setTheme, triggerGrayscale, triggerPartyMode, theme, unlockAchievement]);

  return { showShortcuts, setShowShortcuts };
}