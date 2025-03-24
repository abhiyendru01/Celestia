
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Calendar, Home, Rocket, Star } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: <Home className="w-5 h-5" />, 
      label: 'Home', 
      path: '/' 
    },
    { 
      icon: <Moon className="w-5 h-5" />, 
      label: 'Today', 
      path: '/today' 
    },
    { 
      icon: <Calendar className="w-5 h-5" />, 
      label: 'Your Moon', 
      path: '/your-moon' 
    },
    { 
      icon: <Star className="w-5 h-5" />, 
      label: 'Phases', 
      path: '/phases' 
    },
    { 
      icon: <Rocket className="w-5 h-5" />, 
      label: 'Events', 
      path: '/events' 
    }
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="mx-auto p-4 glass-card backdrop-blur-xl bg-black/50 border-t border-space-cream/10 rounded-t-xl max-w-md">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="relative">
                <Link 
                  to={item.path} 
                  className="flex flex-col items-center p-2 relative z-10"
                >
                  <motion.div 
                    className={`mb-1 ${isActive ? 'text-space-cream' : 'text-space-cream/80'}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className={`text-xs ${isActive ? 'text-space-cream font-medium' : 'text-space-cream/70'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-space-cream/5 rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;
