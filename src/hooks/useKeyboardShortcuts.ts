import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function useKeyboardShortcuts() {
  const { setTheme, triggerGrayscale, triggerPartyMode } = useTheme();
  const [pCount, setPCount] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    let pTimeout: NodeJS.Timeout;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input field
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'p':
          setPCount(prev => prev + 1);
          clearTimeout(pTimeout);
          pTimeout = setTimeout(() => setPCount(0), 1000);
          
          if (pCount === 2) { // Third 'p' press
            setTheme('punny-mode');
            setPCount(0);
          }
          break;
          
        case 'f':
          triggerGrayscale();
          break;
          
        case 'l':
          triggerPartyMode();
          break;
          
        case '?':
          setShowShortcuts(true);
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
  }, [pCount, setTheme, triggerGrayscale, triggerPartyMode]);

  return { showShortcuts, setShowShortcuts };
}