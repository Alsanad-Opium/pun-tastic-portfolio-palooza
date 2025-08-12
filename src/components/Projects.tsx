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
      title: theme === 'punny-mode' ? 'Wild About Tickets' : theme === 'neon-hacker' ? 'TICKET.SYS' : 'TECHNEX-25 Ticketing System',
      description: theme === 'punny-mode'
        ? "Book your next wildlife adventure without the monkey business—our chatbot handles it all!"
        : "Full-stack Django + AI chatbot platform for booking wildlife sanctuary and monument tickets.",
      technologies: ['Django', 'MySQL', 'Langflow', 'JavaScript', 'HTML/CSS'],
      demoUrl: '#', // replace with demo link if available
      githubUrl: 'https://github.com/Alsanad-Opium/Ticketing_system',
      emoji: '🎟️',
      joke: "Why did the chatbot book a safari? It wanted to debug in the wild!"
    },
    {
      id: 2,
      title: theme === 'punny-mode' ? 'Pipe Dream Machine' : theme === 'neon-hacker' ? 'PIPELINE.EXE' : 'Drag-DROP DAG Pipeline Builder',
      description: theme === 'punny-mode'
        ? "Design data flows so smooth, they should come with a jazz soundtrack."
        : "Interactive pipeline builder using ReactFlow + FastAPI with DAG validation.",
      technologies: ['ReactFlow', 'FastAPI', 'NetworkX', 'JavaScript', 'Python'],
      demoUrl: '#',
      githubUrl: 'https://github.com/Alsanad-Opium/Drag-DROP_DAG_pipeline',
      emoji: '🔗',
      joke: "I told my pipeline a joke... now it's streaming with laughter!"
    },
    {
      id: 3,
      title: theme === 'punny-mode' ? 'Chef\'s Kiss AI' : theme === 'neon-hacker' ? 'CHEF.GEMINI' : 'Chef-Gemini',
      description: theme === 'punny-mode'
        ? "Give me your fridge contents, and I'll cook up ideas hotter than your stove!"
        : "AI-powered recipe generator using Google Gemini API for text & image generation.",
      technologies: ['Vite', 'JavaScript', 'Google Gemini API', 'HTML/CSS'],
      demoUrl: '#',
      githubUrl: 'https://github.com/Alsanad-Opium/chef-gemini',
      emoji: '🍳',
      joke: "Why don't AI chefs ever panic? They always keep their cool under pressure."
    },
    {
      id: 4,
      title: theme === 'punny-mode' ? 'Sign Here, Please!' : theme === 'neon-hacker' ? 'SIGN.APP' : 'QuickSign App',
      description: theme === 'punny-mode'
        ? "Draw your autograph faster than a celebrity dodging paparazzi."
        : "Digital signature app with stroke customization and save/download features.",
      technologies: ['JavaScript', 'HTML/CSS', 'Canvas API'],
      demoUrl: '#',
      githubUrl: 'https://github.com/Alsanad-Opium/Quicksign_app',
      emoji: '✍️',
      joke: "Why did the pen refuse to work? It didn't sign up for this."
    },
    {
      id: 5,
      title: theme === 'punny-mode' ? 'Count On Me' : theme === 'neon-hacker' ? 'CALC.EXE' : 'Simple Calculator Website',
      description: theme === 'punny-mode'
        ? "Crunching numbers like they're potato chips-can't stop, won't stop."
        : "Flask-based calculator with responsive UI and backend validation.",
      technologies: ['Flask', 'JavaScript', 'HTML/CSS'],
      demoUrl: '#',
      githubUrl: 'https://github.com/Alsanad-Opium/Simple-Calculator-website',
      emoji: '🧮',
      joke: "Why did the calculator break up? It couldn't count on its partner."
    },
    {
      id: 6,
      title: theme === 'punny-mode' ? 'Type Like The Wind' : theme === 'neon-hacker' ? 'TYPE.SPD' : 'Typing Speed App',
      description: theme === 'punny-mode'
        ? "Test your typing skills before your keyboard files a complaint."
        : "Frontend typing speed test with category-based filtering and dynamic scoring.",
      technologies: ['JavaScript', 'HTML/CSS'],
      demoUrl: '#',
      githubUrl: 'https://github.com/Alsanad-Opium/TypingSpeed_app',
      emoji: '⌨️',
      joke: "My typing speed is like a race car... until autocorrect crashes it."
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
              className="relative h-[400px]"
            >
              <AnimatePresence mode="wait">
                {flippedCard === project.id ? (
                  // Back of card (joke)
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Card 
                      className={`h-full p-6 flex flex-col justify-between cursor-pointer ${
                        theme === 'neon-hacker' ? 'neon-border bg-card/90' : ''
                      }`}
                      onClick={() => handleCardFlip(project.id)}
                      style={{
                        background: theme === 'punny-mode' 
                          ? 'linear-gradient(135deg, hsl(24 95% 56%), hsl(174 64% 47%))'
                          : theme === 'neon-hacker'
                          ? 'linear-gradient(135deg, hsl(120 100% 55%), hsl(180 100% 50%))'
                          : 'linear-gradient(135deg, hsl(5 91% 69%), hsl(48 100% 60%))',
                        color: 'white'
                      }}
                    >
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
                ) : (
                  // Front of card (project details)
                  <motion.div
                    key="front"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Card 
                      className={`h-full p-6 flex flex-col justify-between cursor-pointer hover:shadow-2xl transition-shadow duration-300 ${
                        theme === 'neon-hacker' ? 'neon-border bg-card/90' : ''
                      }`}
                      onClick={() => handleCardFlip(project.id)}
                    >
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
                  </motion.div>
                )}
              </AnimatePresence>
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