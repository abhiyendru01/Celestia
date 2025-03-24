
import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './Navigation';
import StarBackground from '../three/StarBackground';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-space-cream relative overflow-hidden">
      <StarBackground />
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-grow px-4 pb-20 z-10">
        <main className="flex-grow flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`page-${window.location.pathname}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="w-full max-w-3xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Navigation />
    </div>
  );
};

export default AppLayout;
