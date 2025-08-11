import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'neon-hacker' | 'punny-mode';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isGrayscale: boolean;
  triggerGrayscale: () => void;
  isPartyMode: boolean;
  triggerPartyMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    document.body.className = document.body.className
      .replace(/\b(light|neon-hacker|punny-mode)\b/g, '')
      .trim();
    
    if (theme !== 'light') {
      document.body.classList.add(theme);
    }
    
    // Add grayscale filter
    if (isGrayscale) {
      document.body.style.filter = 'grayscale(100%)';
    } else {
      document.body.style.filter = '';
    }
    
    // Add party mode effects
    if (isPartyMode) {
      document.body.classList.add('party-mode');
    } else {
      document.body.classList.remove('party-mode');
    }
  }, [theme, isGrayscale, isPartyMode]);

  const toggleTheme = () => {
    const themes: ThemeMode[] = ['light', 'neon-hacker', 'punny-mode'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const triggerGrayscale = () => {
    setIsGrayscale(true);
    setTimeout(() => setIsGrayscale(false), 3000);
  };

  const triggerPartyMode = () => {
    setIsPartyMode(true);
    setTimeout(() => setIsPartyMode(false), 10000);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      isGrayscale,
      triggerGrayscale,
      isPartyMode,
      triggerPartyMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}