import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMoonPhaseFromNASA, calculateMoonriseAndMoonset } from '../utils/moonPhaseCalculator';
import { Sunrise, Sunset, Info, Clock, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const TodaysMoon: React.FC = () => {
  interface MoonPhase {
    name: string;
    illumination: number;
    shortDescription: string;
    specialMessage: string;
    moonAge: number;
    description: string;
  }

  const [moonPhase, setMoonPhase] = useState<MoonPhase | null>(null);
  interface MoonTimes {
    moonrise: string;
    moonset: string;
  }

  const [moonTimes, setMoonTimes] = useState<MoonTimes | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phase = await fetchMoonPhaseFromNASA(new Date());
        if (phase) {
          setMoonPhase(phase);
        } else {
          toast.error('Could not fetch moon phase data');
        }
        
        const times = calculateMoonriseAndMoonset(new Date());
        setMoonTimes(times);
      } catch (error) {
        console.error('Error fetching moon data:', error);
        toast.error('Could not fetch moon data');
      }
    };
    
    fetchData();
  }, []);

  if (!moonPhase || !moonTimes) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <p className="mt-4 text-space-cream/70">Moon data is unavailable.</p>
      </div>
    );
  }

  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 relative">
      <Particles />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-sm text-space-cream uppercase tracking-wider font-medium">Today's Moon</p>
        <h1 className="text-3xl font-bold text-space-cream mt-1">{formattedDate}</h1>
      </motion.div>
      
      <motion.div 
        className="relative mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div 
          className="w-64 h-64 rounded-full overflow-hidden relative"
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
            style={{ 
              backgroundImage: `url('/images/${moonPhase.name.toLowerCase().replace(/\s+/g, '-')}.png')`, 
              backgroundSize: "cover",
              filter: `brightness(${0.5 + moonPhase.illumination})`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <motion.div 
          className="absolute -top-4 -right-4 bg-black/50 text-space-cream text-lg font-bold w-16 h-16 rounded-full flex items-center justify-center"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, type: "spring" }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 250, 228, 0.6)" }}
        >
          <Moon className="w-8 h-8" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="glass-card rounded-xl p-6 w-full max-w-md relative overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.div 
          className="absolute -top-20 -right-20 w-40 h-40 bg-black/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <h2 className="text-2xl font-bold text-center mb-4 text-space-cream">{moonPhase.name}</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Info className="w-5 h-5 mx-auto mb-1 text-space-cream" />
            <p className="text-space-cream/60 text-sm">Illumination</p>
            <p className="text-xl font-medium text-space-cream">{Math.round(moonPhase.illumination * 100)}%</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Sunrise className="w-5 h-5 mx-auto mb-1 text-space-cream" />
            <p className="text-space-cream/60 text-sm">Moonrise</p>
            <p className="text-lg font-medium text-space-cream">{moonTimes.moonrise}</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Sunset className="w-5 h-5 mx-auto mb-1 text-space-cream" />
            <p className="text-space-cream/60 text-sm">Moonset</p>
            <p className="text-lg font-medium text-space-cream">{moonTimes.moonset}</p>
          </motion.div>
        </div>
        
        <motion.p 
          className="text-space-cream/80 text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {moonPhase.shortDescription}
        </motion.p>
        
        <div className="bg-black/20 p-4 rounded-lg mb-6">
          <h3 className="text-space-cream flex items-center text-sm font-medium mb-2">
            <Star className="w-4 h-4 mr-2" /> Special Message
          </h3>
          <p className="text-space-cream/80 text-sm">{moonPhase.specialMessage}</p>
        </div>
        
        <div className="bg-black/20 p-4 rounded-lg">
          <h3 className="text-space-cream flex items-center text-sm font-medium mb-2">
            <Info className="w-4 h-4 mr-2" /> Lunar Age
          </h3>
          <p className="text-space-cream/80 text-sm">
            This moon is approximately {moonPhase.moonAge} days into its lunar cycle of 29.53 days.
          </p>
        </div>
        <motion.p 
        className="mt-8 text-space-cream/60 text-sm max-w-md text-center font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {moonPhase.description}
      </motion.p>
      </motion.div>
      
     
    </div>
  );
};

export default TodaysMoon;
