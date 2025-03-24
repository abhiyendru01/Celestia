
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { moonPhases, MoonPhase, constellations } from '../utils/moonPhaseCalculator';
import { ChevronRight, ChevronLeft, Moon, Info, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const MoonPhases: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<MoonPhase | null>(null);
  const [viewingConstellation, setViewingConstellation] = useState(false);
  const [selectedConstellation, setSelectedConstellation] = useState(constellations[0]);
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number}>>([]);
  
  // Generate random stars for the constellation visualization
  useEffect(() => {
    if (viewingConstellation) {
      // Generate 30-50 random stars
      const numStars = 30 + Math.floor(Math.random() * 20);
      const newStars = [];
      
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          x: Math.random() * 100, // percentage position
          y: Math.random() * 100,
          size: 0.5 + Math.random() * 2,
        });
      }
      
      setStars(newStars);
    }
  }, [viewingConstellation, selectedConstellation]);
  
  const handleSelectPhase = (phase: MoonPhase) => {
    setSelectedPhase(phase);
    setViewingConstellation(false);
  };
  
  const handleNext = () => {
    if (!selectedPhase) {
      setSelectedPhase(moonPhases[0]);
      return;
    }
    
    const currentIndex = moonPhases.findIndex(phase => phase.name === selectedPhase.name);
    const nextIndex = (currentIndex + 1) % moonPhases.length;
    setSelectedPhase(moonPhases[nextIndex]);
  };
  
  const handlePrevious = () => {
    if (!selectedPhase) {
      setSelectedPhase(moonPhases[moonPhases.length - 1]);
      return;
    }
    
    const currentIndex = moonPhases.findIndex(phase => phase.name === selectedPhase.name);
    const prevIndex = (currentIndex - 1 + moonPhases.length) % moonPhases.length;
    setSelectedPhase(moonPhases[prevIndex]);
  };

  const handleViewConstellations = () => {
    setViewingConstellation(true);
  };

  const handleSelectConstellation = (constellation: typeof constellations[number]) => {
    setSelectedConstellation(constellation);
  };

  const handleBackToMoons = () => {
    setViewingConstellation(false);
  };

  const nextConstellation = () => {
    const currentIndex = constellations.findIndex(c => c.name === selectedConstellation.name);
    const nextIndex = (currentIndex + 1) % constellations.length;
    setSelectedConstellation(constellations[nextIndex]);
  };

  const prevConstellation = () => {
    const currentIndex = constellations.findIndex(c => c.name === selectedConstellation.name);
    const prevIndex = (currentIndex - 1 + constellations.length) % constellations.length;
    setSelectedConstellation(constellations[prevIndex]);
  };

  // Component for displaying the constellation visualization
  const ConstellationVisualization = () => {
    const constellationPaths: Record<string, Array<{ points: number[][]; label: string }>> = {
      "Orion": [
        {points: [[50, 20], [45, 30], [50, 40], [55, 30]], label: "Shoulders & Belt"}, 
        {points: [[50, 40], [50, 60]], label: "Sword"}, 
        {points: [[45, 30], [30, 50]], label: "Left Arm"}, 
        {points: [[55, 30], [70, 50]], label: "Right Arm"}, 
        {points: [[50, 60], [40, 85]], label: "Left Leg"}, 
        {points: [[50, 60], [60, 85]], label: "Right Leg"}
      ],
      "Ursa Major": [
        {points: [[30, 30], [40, 35], [50, 30], [55, 40], [65, 45], [75, 40], [85, 45]], label: "Big Dipper"}
      ],
      "Cassiopeia": [
        {points: [[30, 40], [45, 30], [60, 20], [75, 30], [90, 40]], label: "W shape"}
      ],
      "Lyra": [
        {points: [[50, 30], [55, 40], [50, 50], [45, 40], [50, 30]], label: "Lyre shape"}
      ],
      "Scorpius": [
        {points: [[30, 30], [40, 35], [50, 35], [60, 40], [65, 50], [60, 60], [65, 70], [70, 80]], label: "S shape"}
      ]
    };

    const currentPath = constellationPaths[selectedConstellation.name] || [];

    return (
      <div className="relative w-full h-64 bg-black rounded-lg mb-6 overflow-hidden">
        {/* Background stars */}
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-space-cream"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Constellation lines */}
        {currentPath.map((path: { points: number[][]; label: string }, i: number) => (
          <React.Fragment key={i}>
            <svg className="absolute inset-0 w-full h-full" style={{zIndex: 10}}>
              <motion.path
                d={`M ${path.points.map((p: number[]) => `${p[0]} ${p[1]}`).join(' L ')}`}
                stroke="#fffae4"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, delay: i * 0.5 }}
              />
            </svg>
            
            {/* Key stars at each point */}
            {path.points.map((point: number[], j: number) => (
              <motion.div
                key={`star-${i}-${j}`}
                className="absolute rounded-full bg-space-cream"
                style={{
                  left: `${point[0]}%`,
                  top: `${point[1]}%`,
                  width: '4px',
                  height: '4px',
                  zIndex: 20,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  boxShadow: ["0 0 2px #fffae4", "0 0 8px #fffae4", "0 0 2px #fffae4"] 
                }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.5 + 0.2 * j,
                }}
              />
            ))}
          </React.Fragment>
        ))}

        <motion.div 
          className="absolute bottom-2 right-2 text-xs text-space-cream/70 bg-black/60 px-2 py-1 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {selectedConstellation.name}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <p className="text-sm text-space-cream uppercase tracking-wider font-medium">Learn</p>
        <h1 className="text-3xl font-bold text-space-cream mt-1">
          {viewingConstellation ? 'Constellations' : 'Moon Phases'}
        </h1>
        <p className="text-space-cream/70 mt-2 max-w-md">
          {viewingConstellation 
            ? 'Explore the major constellations and their mythological origins.'
            : 'Explore the eight phases of the lunar cycle and their meanings.'}
        </p>
      </motion.div>

      {!viewingConstellation && !selectedPhase && (
        <div className="mb-4 flex space-x-2">
          <Button 
            variant="secondary" 
            className="bg-black/30 text-space-cream hover:bg-black/40"
            onClick={() => handleViewConstellations()}
          >
            <Star className="w-4 h-4 mr-2" />
            View Constellations
          </Button>
        </div>
      )}
      
      {!viewingConstellation && selectedPhase ? (
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="relative mb-6 flex justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img 
                src={`/images/moon-phases/${selectedPhase.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={selectedPhase.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="absolute bottom-0 right-0 bg-black/50 text-space-cream text-2xl w-12 h-12 rounded-full flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-xl p-6 relative overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-center text-space-cream">{selectedPhase.name}</h2>
            <p className="text-space-cream/80 text-center mb-4">{selectedPhase.shortDescription}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-xs text-space-cream/60 mb-1">Illumination</p>
                <p className="text-xl text-space-cream">{Math.round(selectedPhase.illumination * 100)}%</p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-xs text-space-cream/60 mb-1">Moon Age</p>
                <p className="text-xl text-space-cream">{selectedPhase.moonAge} days</p>
              </div>
            </div>
            
            <div className="mb-4 p-4 bg-black/10 rounded-lg">
              <h3 className="text-space-cream mb-2 text-sm font-medium">Description</h3>
              <p className="text-space-cream/70 text-sm">{selectedPhase.description}</p>
            </div>
            
            <div className="mb-4 p-4 bg-black/10 rounded-lg">
              <h3 className="text-space-cream mb-2 text-sm font-medium">Special Message</h3>
              <p className="text-space-cream/70 text-sm">{selectedPhase.specialMessage}</p>
            </div>
            
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-space-cream" />
              </motion.button>
              
              <Button
                variant="secondary" 
                className="bg-black/30 text-space-cream hover:bg-black/40"
                onClick={() => handleViewConstellations()}
              >
                <Star className="w-4 h-4 mr-2" />
                View Constellations
              </Button>
              
              <motion.button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-space-cream" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : viewingConstellation ? (
        // Constellation view
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-black/20 border-space-cream/10 text-space-cream">
            <CardHeader className="relative">
              <CardTitle className="text-2xl text-center">{selectedConstellation.name}</CardTitle>
              <CardDescription className="text-space-cream/70 text-center">
                Best viewed in {selectedConstellation.bestViewed}
              </CardDescription>
              
              {/* Navigation arrows in top-right corner */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  onClick={prevConstellation}
                  className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-4 h-4 text-space-cream" />
                </motion.button>
                <motion.button
                  onClick={nextConstellation}
                  className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-4 h-4 text-space-cream" />
                </motion.button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Constellation Visualization */}
              <ConstellationVisualization />
              
              <div className="mb-4 p-4 bg-black/10 rounded-lg">
                <h3 className="text-space-cream mb-2 text-sm font-medium">Description</h3>
                <p className="text-space-cream/70 text-sm">{selectedConstellation.description}</p>
              </div>
              
              <div className="mb-4 p-4 bg-black/10 rounded-lg">
                <h3 className="text-space-cream mb-2 text-sm font-medium">Notable Stars</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedConstellation.stars.map((star: string) => (
                    <span key={star} className="inline-block px-2 py-1 text-xs bg-black/30 rounded-full text-space-cream">
                      {star}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4 p-4 bg-black/10 rounded-lg">
                <h3 className="text-space-cream mb-2 text-sm font-medium">Mythology</h3>
                <p className="text-space-cream/70 text-sm">{selectedConstellation.mythology}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="secondary" 
                className="bg-black/30 text-space-cream hover:bg-black/40"
                onClick={prevConstellation}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                variant="secondary" 
                className="bg-black/30 text-space-cream hover:bg-black/40"
                onClick={handleBackToMoons}
              >
                <Moon className="w-4 h-4 mr-2" />
                Back to Moons
              </Button>
              
              <Button 
                variant="secondary" 
                className="bg-black/30 text-space-cream hover:bg-black/40"
                onClick={nextConstellation}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {moonPhases.map((phase, index) => (
            <motion.div
              key={phase.name}
              className="glass-card rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 250, 228, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectPhase(phase)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <div className="text-3xl mb-2">
                <Moon className="w-10 h-10 text-space-cream" />
              </div>
              <p className="text-sm font-medium text-center text-space-cream">{phase.name}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MoonPhases;
