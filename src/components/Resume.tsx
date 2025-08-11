import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function Resume() {
  const { theme } = useTheme();

  return (
    <section id="resume" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'neon-hacker' ? 'neon-glow' : ''}`}>
            {theme === 'neon-hacker' ? '< RESUME.DOC />' : 'Download My Resume'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Grab a copy of my latest resume. If you need a different format, feel free to contact me.
          </p>
        </motion.div>

        <Card className={`max-w-2xl mx-auto p-6 text-center ${theme === 'neon-hacker' ? 'neon-border bg-card/90' : ''}`}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">PDF format, optimized for quick review.</p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg" className={`${theme === 'neon-hacker' ? 'neon-border' : ''}`}>
                <a href="/assets/resume.pdf" download>
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/assets/resume.pdf" target="_blank" rel="noreferrer">
                  View in Browser
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default Resume;
