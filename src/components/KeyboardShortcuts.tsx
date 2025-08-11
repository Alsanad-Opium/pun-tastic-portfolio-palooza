import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  const shortcuts = [
    { key: 'P x3', description: 'Toggle Punny Mode (press P three times quickly)' },
    { key: 'F', description: 'Grayscale mode for 3 seconds (Paying respects...)' },
    { key: 'L', description: 'Disco lights / party mode for 10 seconds' },
    { key: '?', description: 'Show this help dialog' },
    { key: 'ESC', description: 'Close dialogs / Skip intro' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="max-w-md mx-auto p-6 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-6">
                  <Keyboard className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Keyboard Shortcuts</h3>
                </div>
                
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={shortcut.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          {shortcut.key}
                        </kbd>
                        <span className="text-sm">{shortcut.description}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Button onClick={onClose}>
                    Got it! 🎮
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}