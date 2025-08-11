import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Monitor, Zap, Palette } from 'lucide-react';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'neon-hacker': return <Zap className="h-4 w-4" />;
      case 'punny-mode': return <Palette className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'neon-hacker': return 'Hacker Mode';
      case 'punny-mode': return 'Punny Mode';
      default: return 'Light Mode';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-40"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold"
          >
            <span className={theme === 'neon-hacker' ? 'neon-glow' : ''}>
              {theme === 'punny-mode' ? '🎭 PunMaster' : theme === 'neon-hacker' ? '< /DEV >' : '💻 DevComedy'}
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {['about', 'projects', 'skills', 'contact'].map((section) => (
              <Button
                key={section}
                variant="ghost"
                onClick={() => scrollToSection(section)}
                className="capitalize hover:scale-105 transition-transform"
              >
                {section === 'about' && theme === 'punny-mode' && '🤓 About'}
                {section === 'projects' && theme === 'punny-mode' && '🚀 Pro-jects'}
                {section === 'skills' && theme === 'punny-mode' && '⚡ Skill-ionaire'}
                {section === 'contact' && theme === 'punny-mode' && '📞 Con-tact'}
                {theme !== 'punny-mode' && section}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const themes = ['light', 'neon-hacker', 'punny-mode'] as const;
                const currentIndex = themes.indexOf(theme);
                const nextIndex = (currentIndex + 1) % themes.length;
                setTheme(themes[nextIndex]);
              }}
              className="flex items-center space-x-2"
            >
              {getThemeIcon()}
              <span className="hidden sm:inline">{getThemeLabel()}</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}