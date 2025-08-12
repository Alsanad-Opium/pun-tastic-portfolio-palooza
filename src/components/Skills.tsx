import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Code, Database, Palette, Zap, Coffee, Bug, 
  Lightbulb, Brain, Mic, Users 
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ComponentType<any>;
  joke: string;
  category: 'frontend' | 'backend' | 'design' | 'other' | 'ai_ml' | 'data';
}

const skills: Skill[] = [
  { 
    name: 'Frontend Development', 
    icon: Code, 
    joke: "React, JavaScript, HTML, CSS & Tailwind — making pixels behave since forever.", 
    category: 'frontend' 
  },
  { 
    name: 'Backend Development', 
    icon: Database, 
    joke: "Flask, Python, and C++ — keeping the server side spicy.", 
    category: 'backend' 
  },
  { 
    name: 'Databases', 
    icon: Database, 
    joke: "SQL, PostgreSQL, and MongoDB — my data always has a safe home.", 
    category: 'backend' 
  },
  { 
    name: 'Data Science & AI', 
    icon: Zap, 
    joke: "Pandas, NumPy, Scikit-learn, spaCy — teaching machines to think-ish.", 
    category: 'ai_ml' 
  },
  { 
    name: 'Version Control', 
    icon: Code, 
    joke: "Git — my personal time machine for code disasters.", 
    category: 'other' 
  },
  { 
    name: 'Creative & Team Skills', 
    icon: Lightbulb, 
    joke: "Project ideation, problem solving, pitching, collaboration — and coffee-powered optimism.", 
    category: 'other' 
  }
];




export function Skills() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [clickedSkills, setClickedSkills] = useState(new Set<string>());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSkillClick = (skill: Skill) => {
    // Show the joke
    toast({
      title: `${skill.name} Joke!`,
      description: skill.joke,
      duration: 4000,
    });

    // Track clicked skills
    const newClickedSkills = new Set(clickedSkills);
    newClickedSkills.add(skill.name);
    setClickedSkills(newClickedSkills);

    // Secret achievement: click 5 different skills
    if (newClickedSkills.size >= 5 && !showConfetti) {
      setShowConfetti(true);
      toast({
        title: "🎉 Achievement Unlocked!",
        description: "Skill-ionaire: You've discovered 5 tech jokes!",
        duration: 6000,
      });
      
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getPunnyTitle = () => {
    if (theme === 'punny-mode') return '⚡ Skill-ionaire Status';
    if (theme === 'neon-hacker') return '< SKILLS.exe />';
    return '⚡ Skills & Superpowers';
  };

  const getPunnySubtitle = () => {
    if (theme === 'punny-mode') return 'Click for tech-nical jokes! 🤓';
    if (theme === 'neon-hacker') return 'RUNTIME: Humor.exe';
    return 'Click each skill to hear a programmer joke!';
  };

  return (
    <section id="skills" className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: -100, x: Math.random() * window.innerWidth }}
                animate={{ opacity: 0, y: window.innerHeight + 100, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, delay: Math.random() * 2 }}
                className="absolute text-2xl"
              >
                {['🎉', '🎊', '💫', '⭐', '🚀'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-6 ${theme === 'neon-hacker' ? 'neon-glow' : ''}`}>
            {getPunnyTitle()}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {getPunnySubtitle()}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            const isClicked = clickedSkills.has(skill.name);
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: theme === 'punny-mode' ? 5 : 0 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Badge
                  variant={isClicked ? "default" : "outline"}
                  className={`
                    w-full p-4 cursor-pointer transition-all duration-300 flex flex-col items-center space-y-2
                    hover:shadow-lg hover:border-primary/50
                    ${isClicked ? 'bg-primary text-primary-foreground' : ''}
                    ${theme === 'neon-hacker' && isClicked ? 'neon-border neon-glow' : ''}
                    ${theme === 'punny-mode' ? 'wobble' : ''}
                  `}
                  onClick={() => handleSkillClick(skill)}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                  
                  {/* Clicked indicator */}
                  {isClicked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 text-lg"
                    >
                      😂
                    </motion.div>
                  )}
                </Badge>
              </motion.div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Jokes discovered: {clickedSkills.size}/{skills.length}
            {clickedSkills.size >= 5 && " 🎉"}
          </p>
        </motion.div>

        {/* Secret Click Zone - Easter Egg */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-4 right-4 w-8 h-8 opacity-10 hover:opacity-100 cursor-pointer"
          onClick={() => {
            toast({
              title: "🕵️ Secret Found!",
              description: "You found a hidden easter egg! Nice detective work!",
              duration: 4000,
            });
          }}
        >
          🥚
        </motion.div>
      </div>
    </section>
  );
}