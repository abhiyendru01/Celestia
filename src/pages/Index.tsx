
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Moon, Star, Sparkles, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <motion.div 
        className="absolute inset-0 z-[-1] opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-space-light-cream/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-space-light-cream/10 rounded-full filter blur-3xl" />
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative"
      >
        <motion.div 
          className="w-48 h-48 rounded-full overflow-hidden animate-float relative"
          animate={{ 
            boxShadow: [
              "0 0 40px 5px rgba(255, 250, 228, 0.3)",
              "0 0 60px 10px rgba(255, 250, 228, 0.5)",
              "0 0 40px 5px rgba(255, 250, 228, 0.3)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <motion.div 
            className="w-full h-full moon-shadow"
            style={{ backgroundImage: "url('/images/moonicon.png')", backgroundSize: "cover" }}
          />
        </motion.div>

        
      </motion.div>

      <motion.h1 
        className="mt-12 text-4xl md:text-6xl font-bold tracking-tight text-glow font-space"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
            >
        What's Your <motion.span 
          className="text-ice-white"
          animate={{ 
            textShadow: [
              "0 0 8px rgba(255, 255, 255, 0.5)",
              "0 0 16px rgba(255, 255, 255, 0.8)",
              "0 0 8px rgba(255, 255, 255, 0.5)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Moon
        </motion.span>?
            </motion.h1>
      
      <motion.p 
        className="mt-6 text-lg md:text-xl text-space-cream/80 max-w-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Explore the phases of the moon, discover your birth moon, and learn about the lunar cycle through an immersive experience.
      </motion.p>
      
      <motion.div 
        className="mt-12 flex flex-col md:flex-row gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Link to="/today">
          <motion.button 
            className="px-8 py-3 rounded-full bg-slate-100/20 hover:bg-slate-100/50 backdrop-blur-xs text-space-cream  font-medium flex items-center gap-2 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-space-amber/50 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center">
              Today's Moon 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.span>
            </span>
          </motion.button>
        </Link>
        
        <Link to="/your-moon">
          <motion.button 
            className="px-8 py-3 rounded-full bg-transparent border border-space-cream/30 hover:border-space-cream/60 text-space-cream font-medium transition-all"
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 215, 0, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center">
              <Moon className="w-4 h-4 mr-2" /> Find Your Birth Moon
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Index;
