import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { ExternalLink, Github, Zap, Coffee, Smile } from 'lucide-react';

export function Projects() {
  const { theme } = useTheme();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: theme === 'punny-mode' ? 'Task-tic Organizer' : theme === 'neon-hacker' ? 'TASK.EXE' : 'Task Management App',
      description: theme === 'punny-mode' 
        ? "A task manager so good, it'll make your to-do list say 'ta-da!' instead!" 
        : "Full-featured task management application with real-time collaboration",
      technologies: ['React', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      githubUrl: '#',
      emoji: '📋',
      joke: "Why did the task manager break up with the calendar? It had too many dates!"
    },
    {
      id: 2,
      title: theme === 'punny-mode' ? 'E-com-media Platform' : theme === 'neon-hacker' ? 'SHOP.MATRIX' : 'E-Commerce Platform',
      description: theme === 'punny-mode' 
        ? "Shopping made so easy, even your wallet will thank you (before crying)!" 
        : "Modern e-commerce solution with advanced analytics and inventory management",
      technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
      demoUrl: '#',
      githubUrl: '#',
      emoji: '🛒',
      joke: "How do you comfort a JavaScript bug? You console it!"
    },
    {
      id: 3,
      title: theme === 'punny-mode' ? 'Weather-ing Heights' : theme === 'neon-hacker' ? 'CLIMATE.SYS' : 'Weather Dashboard',
      description: theme === 'punny-mode' 
        ? "Predicting weather better than your grandmother's knee!" 
        : "Beautiful weather dashboard with location-based forecasts and data visualization",
      technologies: ['Vue.js', 'Chart.js', 'Weather API'],
      demoUrl: '#',
      githubUrl: '#',
      emoji: '🌤️',
      joke: "Why don't developers trust the weather API? Because it's always cloudy with a chance of bugs!"
    },
    {
      id: 4,
      title: 'The Button That Does Nothing',
      description: "A masterpiece of engineering that does absolutely nothing when clicked. Won the 2024 Award for 'Most Honest User Interface'.",
      technologies: ['HTML', 'CSS', 'Disappointment'],
      demoUrl: '#nothing',
      githubUrl: '#nothing',
      emoji: '🔘',
      joke: "This button is like my motivation on Monday morning - non-functional but still there!"
    }
  ];

  const handleCardFlip = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  const handleNothingButton = () => {
    alert("Congratulations! You found the button that does nothing. As promised, nothing happened. 🎉");
  };

  return (
    <section id="projects" className="py-20">
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
            {theme === 'punny-mode' ? '🚀 Pro-jects that Rock' : 
             theme === 'neon-hacker' ? '< PROJECT.FILES />' : 
             'Featured Projects'}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${
            theme === 'punny-mode' ? 'font-baloo' : ''
          }`}>
            {theme === 'punny-mode' 
              ? "Projects so good, they'll make your code jealous! Click to flip and discover the puns within." 
              : theme === 'neon-hacker'
              ? "> Executing digital solutions that push the boundaries of what's possible."
              : "A collection of projects that showcase my passion for creating amazing digital experiences."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[400px] perspective-1000"
            >
              <motion.div
                className={`w-full h-full relative preserve-3d cursor-pointer ${
                  flippedCard === project.id ? 'rotate-y-180' : ''
                }`}
                onClick={() => handleCardFlip(project.id)}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s'
                }}
              >
                {/* Front of card */}
                <Card className={`absolute inset-0 backface-hidden p-6 flex flex-col justify-between ${
                  theme === 'neon-hacker' ? 'neon-border bg-card/90' : ''
                } hover:shadow-2xl transition-shadow duration-300`}>
                  <div>
                    <div className="text-6xl mb-4 text-center">{project.emoji}</div>
                    <h3 className={`text-xl font-bold mb-3 ${
                      theme === 'neon-hacker' ? 'neon-glow-secondary' : 
                      theme === 'punny-mode' ? 'font-comic' : ''
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-muted-foreground mb-4 ${
                      theme === 'punny-mode' ? 'font-baloo' : ''
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className={`${
                          theme === 'punny-mode' ? 'wobble' : ''
                        }`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    💡 Click to flip & see the joke!
                  </div>
                </Card>

                {/* Back of card */}
                <Card className={`absolute inset-0 backface-hidden rotate-y-180 p-6 flex flex-col justify-between ${
                  theme === 'neon-hacker' ? 'neon-border bg-card/90' : ''
                } bg-gradient-fun text-white`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="text-center space-y-4">
                    <div className="text-4xl">😂</div>
                    <p className="text-lg font-medium leading-relaxed">
                      {project.joke}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    {project.title === 'The Button That Does Nothing' ? (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNothingButton();
                        }}
                        variant="secondary"
                        className="flex items-center space-x-2"
                      >
                        <Zap className="h-4 w-4" />
                        <span>Do Nothing</span>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center space-x-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Demo</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center space-x-2"
                        >
                          <Github className="h-4 w-4" />
                          <span>Code</span>
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className={`text-muted-foreground mb-4 ${
            theme === 'punny-mode' ? 'font-baloo' : ''
          }`}>
            {theme === 'punny-mode' 
              ? "Want to see more pun-derful projects? Check out my GitHub!" 
              : "Want to see more? Check out my full portfolio on GitHub!"}
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className={`hover:scale-105 transition-transform ${
              theme === 'punny-mode' ? 'wobble' : 
              theme === 'neon-hacker' ? 'neon-border' : ''
            }`}
          >
            <Github className="h-5 w-5 mr-2" />
            {theme === 'punny-mode' ? 'Git More Projects' : 'View All Projects'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}