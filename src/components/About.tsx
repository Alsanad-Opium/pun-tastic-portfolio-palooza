import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Code, Coffee, Heart, Zap } from 'lucide-react';

export function About() {
  const { theme } = useTheme();
  const [hatIndex, setHatIndex] = useState(0);
  
  const hats = ['🎩', '👑', '🧢', '🎓', '🤠', '👒', '🎪'];

  const skills = [
    { name: 'React', level: 95, joke: "React: Making components more dramatic than my dating life!" },
    { name: 'Python', level: 90, joke: "Python: The language so simple, even my rubber duck understands it!" },
    { name: 'AI/ML', level: 80, joke: "AI/ML: Making machines smarter than me!" },
    { name: 'TypeScript', level: 85, joke: "TypeScript: Because I like my errors at compile time, not in production!" },
    { name: 'Node.js', level: 80, joke: "Node.js: Bringing JavaScript to the back-end since servers got lonely!" },
  ];

  const timeline = [
    { year: '2023', event: 'SSC Graduation', emoji: '🎓', description: 'Completed SSC with 94% marks' },
    { year: '2023-2026', event: 'Diploma in AIML', emoji: '🤖', description: 'Pursuing 3rd year in Artificial Intelligence and Machine Learning' },
    { year: '2024 Summer', event: 'Internship @ ITnetworkz Infotech', emoji: '💼', description: 'Worked on practical projects and industry-focused learning' },
    { year: '2023-2025', event: 'Hackathon Participation', emoji: '⚡', description: 'Participated in multiple hackathons, enhancing problem-solving and teamwork skills' }
  ];
  

  const cycleHat = () => {
    setHatIndex((prev) => (prev + 1) % hats.length);
  };

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-6 ${
            theme === 'neon-hacker' ? 'neon-glow' : 
            theme === 'punny-mode' ? 'font-comic' : ''
          }`}>
            {theme === 'punny-mode' ? '🤓 About This Code Comedian' : 
             theme === 'neon-hacker' ? '< PROFILE.DATA />' : 
             'About Me'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                onClick={cycleHat}
                className="cursor-pointer relative"
              >
                <div className="w-32 h-32 bg-gradient-fun rounded-full flex items-center justify-center text-6xl relative">
                  👨‍💻
                  <motion.span
                    key={hatIndex}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-2 text-4xl"
                  >
                    {hats[hatIndex]}
                  </motion.span>
                </div>
              </motion.div>
              
              <div>
                <h3 className={`text-2xl font-bold ${
                  theme === 'neon-hacker' ? 'neon-glow-secondary' : 
                  theme === 'punny-mode' ? 'font-comic' : ''
                }`}>
                  {theme === 'punny-mode' ? 'The Pun-der Developer' : 
                   theme === 'neon-hacker' ? '> dev.getName("Alsanad Sheikh")' : 
                   'Alsanad Sheikh The Developer'}
                </h3>
                <p className="text-muted-foreground">
                  {theme === 'punny-mode' ? 'Master of Code-dy' : 
                   theme === 'neon-hacker' ? 'System.exe Administrator' : 
                   'Full Stack AI/ML Developer & Code Enthusiast'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-primary" />
                <span>{theme === 'punny-mode' ? 'Pun-ctional Programming Expert' : 'Clean Code Advocate'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="h-5 w-5 text-primary" />
                <span>{theme === 'punny-mode' ? 'Caffeine-Driven Development' : 'Coffee-Powered Developer'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>{theme === 'punny-mode' ? 'Code with Love & Laughs' : 'Passionate Problem Solver'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>{theme === 'punny-mode' ? 'Lightning-Fast Execution' : 'Performance Optimization'}</span>
              </div>
            </div>

            <p className={`text-lg leading-relaxed ${
              theme === 'punny-mode' ? 'font-baloo' : ''
            }`}>
              {theme === 'punny-mode' 
                ? "I'm not just a developer, I'm a devel-pun-er! I believe code should be clean, efficient, and full of Easter eggs. When I'm not busy debugging the matrix, you'll find me crafting the perfect programming pun or trying to convince my rubber duck that recursion isn't scary." 
                : theme === 'neon-hacker'
                ? "> Passionate about creating digital experiences that push boundaries. Expert in modern web technologies with a focus on performance and user experience. Currently working on making the internet a more interesting place, one commit at a time."
                : "I'm a passionate full-stack developer who believes great code should be clean, efficient, and maintainable. When I'm not crafting digital experiences, I'm probably debugging something or learning the latest tech trends. I love turning coffee into code and ideas into reality."}
            </p>
          </motion.div>

          {/* Timeline & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Timeline */}
            <Card className="p-6">
              <h4 className={`text-xl font-bold mb-4 ${
                theme === 'neon-hacker' ? 'neon-glow-secondary' : 
                theme === 'punny-mode' ? 'font-comic' : ''
              }`}>
                {theme === 'punny-mode' ? '🎪 My Comedy Timeline' : 
                 theme === 'neon-hacker' ? '> timeline.log' : 
                 'Journey Timeline'}
              </h4>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <div className="font-semibold">{item.year} - {item.event}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Skills Preview */}
            <Card className="p-6">
              <h4 className={`text-xl font-bold mb-4 ${
                theme === 'neon-hacker' ? 'neon-glow-secondary' : 
                theme === 'punny-mode' ? 'font-comic' : ''
              }`}>
                {theme === 'punny-mode' ? '⚡ Skill-arious Abilities' : 
                 theme === 'neon-hacker' ? '> skills.array' : 
                 'Core Skills'}
              </h4>
              <div className="space-y-3">
                {skills.slice(0, 5).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '100%' }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-primary h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}