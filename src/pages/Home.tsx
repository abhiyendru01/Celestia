
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Moon as MoonIcon, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <motion.div 
        className="absolute inset-0 z-[-1] opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-space-silver/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-space-silver/20 rounded-full filter blur-3xl" />
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
          className="text-space-purple"
          animate={{ 
            textShadow: [
              "0 0 8px rgba(147, 129, 255, 0.5)",
              "0 0 16px rgba(147, 129, 255, 0.8)",
              "0 0 8px rgba(147, 129, 255, 0.5)"
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
        className="mt-6 text-lg md:text-xl text-space-silver/80 max-w-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Explore the phases of the moon, discover your birth moon, and learn about the lunar cycle through an immersive experience.
      </motion.p>
      
      <motion.div 
        className="mt-12 flex flex-col md:flex-row gap-4 flex-wrap justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Link to="/today">
          <motion.button 
            className="px-8 py-3 rounded-full bg-space-purple hover:bg-space-purple/90 text-white font-medium flex items-center gap-2 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-space-purple/50 z-0"
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
            className="px-8 py-3 rounded-full bg-transparent border border-space-silver/30 hover:border-white/20 text-space-silver font-medium transition-all"
            whileHover={{ scale: 1.05, borderColor: "rgba(147, 129, 255, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center">
              <MoonIcon className="w-4 h-4 mr-2" /> Find Your Birth Moon
            </span>
          </motion.button>
        </Link>

        <Link to="/constellations">
          <motion.button 
            className="px-8 py-3 rounded-full bg-space-blue hover:bg-space-blue/90 text-white font-medium flex items-center gap-2 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-space-blue/50 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center">
              Explore Constellations 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Star className="w-4 h-4 ml-1" />
              </motion.span>
            </span>
          </motion.button>
        </Link>

        <Link to="/cosmic-events">
          <motion.button 
            className="px-8 py-3 rounded-full bg-space-green hover:bg-space-green/90 text-white font-medium flex items-center gap-2 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-space-green/50 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center">
              Upcoming Cosmic Events 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 ml-1" />
              </motion.span>
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
