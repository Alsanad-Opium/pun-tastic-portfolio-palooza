import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Rocket, Send, Waves, GamepadIcon, Github, Linkedin, Mail } from 'lucide-react';
import emailjs from 'emailjs-com';

export function Contact() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isRocketLaunched, setIsRocketLaunched] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/Alsanad-Opium',
      icon: <Github className="h-6 w-6" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohammad-alsanad-sheikh-a12818302',
      icon: <Linkedin className="h-6 w-6" />,
    },
    // {
    //   name: 'Email',
    //   url: 'mailto:alsanad112006@gmail.com',
    //   icon: <Mail className="h-6 w-6" />,
    // },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'message' && value.toLowerCase().includes('hello world')) {
      if (!isWaving) {
        setIsWaving(true);
        toast({
          title: "👋 Hello World detected!",
          description: "Classic! *waves back enthusiastically*",
          duration: 3000,
        });
        setTimeout(() => setIsWaving(false), 2000);
      }
    }
    
    if (field === 'message' && value.toLowerCase().includes("i'm bored")) {
      setShowMiniGame(true);
      toast({
        title: "🎮 Boredom Detected!",
        description: "Launching mini-game! 🚀",
        duration: 3000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Oops! 🤔",
        description: "Please fill in all fields before launching the rocket!",
        duration: 3000,
      });
      return;
    }

    setIsRocketLaunched(true);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { name: formData.name, email: formData.email, message: formData.message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        toast({
          title: "🚀 Message Launched!",
          description: "Your message is flying through cyberspace!",
          duration: 4000,
        });

        setTimeout(() => {
          setIsRocketLaunched(false);
          setFormData({ name: '', email: '', message: '' });
          toast({
            title: "📬 Message Delivered!",
            description: "Thanks for reaching out! I'll get back to you soon.",
            duration: 4000,
          });
        }, 3000);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setIsRocketLaunched(false);
        toast({
          title: "Error 😢",
          description: "Failed to send your message. Please try again later.",
          duration: 4000,
        });
      });
  };

  const getPunnyTitle = () => {
    if (theme === 'punny-mode') return '📞 Con-tact Me';
    if (theme === 'neon-hacker') return '< CONNECT.protocol />';
    return '📞 Let\'s Connect';
  };

  const getPunnySubtitle = () => {
    if (theme === 'punny-mode') return 'Drop me a line, or a pun! 😄';
    if (theme === 'neon-hacker') return 'ESTABLISH COMMUNICATION CHANNEL';
    return 'Send me a message and I\'ll get back to you!';
  };

  const getPlaceholders = () => {
    if (theme === 'punny-mode') {
      return {
        name: 'Your epic name here...',
        email: 'your@awesome.email',
        message: 'Tell me something pun-derful!'
      };
    }
    if (theme === 'neon-hacker') {
      return {
        name: 'ENTER_USERNAME',
        email: 'user@matrix.net',
        message: 'TRANSMIT_MESSAGE_DATA'
      };
    }
    return {
      name: 'Your name',
      email: 'your@email.com',
      message: 'Your message (try typing "hello world" or "I\'m bored"!)'
    };
  };

  const placeholders = getPlaceholders();

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <AnimatePresence>
        {showMiniGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMiniGame(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background border border-border rounded-lg p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <GamepadIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Mini-Game Placeholder</h3>
              <p className="text-muted-foreground mb-6">
                A fun Flappy Bird-like game would go here! 🐦
              </p>
              <Button onClick={() => setShowMiniGame(false)}>
                Back to Reality
              </Button>
            </motion.div>
          </motion.div>
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

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  placeholder={placeholders.name}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`${theme === 'neon-hacker' ? 'neon-border' : ''}`}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={placeholders.email}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${theme === 'neon-hacker' ? 'neon-border' : ''}`}
                />
              </div>
            </div>
            
            <div>
              <Textarea
                placeholder={placeholders.message}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`min-h-32 ${theme === 'neon-hacker' ? 'neon-border' : ''}`}
              />
            </div>

            <motion.div className="text-center relative">
              <Button
                type="submit"
                size="lg"
                className={`
                  relative overflow-hidden
                  ${theme === 'punny-mode' ? 'wobble' : ''}
                  ${theme === 'neon-hacker' ? 'neon-border' : ''}
                `}
                disabled={isRocketLaunched}
              >
                <motion.div
                  className="flex items-center space-x-2"
                  animate={isWaving ? { rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 0.5, repeat: isWaving ? 3 : 0 }}
                >
                  {isRocketLaunched ? (
                    <>
                      <motion.div
                        animate={{ y: -100, opacity: 0 }}
                        transition={{ duration: 2 }}
                      >
                        <Rocket className="h-5 w-5" />
                      </motion.div>
                      <span>Launching...</span>
                    </>
                  ) : isWaving ? (
                    <>
                      <Waves className="h-5 w-5" />
                      <span>Hello World!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>
                        {theme === 'punny-mode' ? 'Send-sational!' : 
                         theme === 'neon-hacker' ? 'TRANSMIT' : 'Send Message'}
                      </span>
                    </>
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Or find me on these platforms:
            </p>
            <div className="flex justify-center space-x-6">
              {socials.map(({ name, url, icon }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: theme === 'punny-mode' ? 10 : 0 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center space-x-2
                    text-muted-foreground hover:text-primary transition-colors
                    ${theme === 'neon-hacker' ? 'hover:neon-glow' : ''}
                  `}
                >
                  {icon}
                  <span>{name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
