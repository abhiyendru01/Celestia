
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, ExternalLink, Heart, Star, Moon, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: 'https://github.com', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Star className="w-5 h-5" />, url: '#', label: 'Star' },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full py-6 px-4 mt-12 glass-card backdrop-blur-md bg-black/20 border-t border-space-cream/10 rounded-t-xl"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-space-cream flex items-center">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                className="mr-2"
              >
                <Moon className="w-6 h-6 text-space-cream" />
              </motion.div>
              What's Your Moon?
            </h3>
            <p className="text-space-cream/60 text-sm mt-1">Explore the cosmos and your lunar connections</p>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex space-x-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-space-cream/70 hover:text-space-cream transition-colors"
                whileHover={{ 
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-6 pt-4 border-t border-space-cream/5 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.p 
            className="text-center text-space-cream/50 text-xs flex items-center"
            whileHover={{ color: 'rgba(255, 250, 228, 0.8)' }}
          >
            Made with 
            <motion.span className="mx-1 text-space-cream">
              <Sparkles className="w-3 h-3" />
            </motion.span>
            and cosmic energy
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
