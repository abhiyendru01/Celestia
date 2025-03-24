
import React, { useEffect, useState } from 'react';
import { fetchUpcomingSpaceEvents } from '../utils/moonPhaseCalculator';
import { motion } from 'framer-motion';
import { Calendar, Star, ExternalLink, Rocket, Info, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import EventDetailsModal from '@/components/EventDetailsModal';

type SpaceEvent = {
  title: string;
  date: string;
  description: string;
  image: string;
  type: string;
  location?: string;
  equipment?: string;
  duration?: string;
  fullDetails?: string;
  relatedEvents?: string[];
};

const SpaceEvents: React.FC = () => {
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const upcomingEvents = await fetchUpcomingSpaceEvents();
      setEvents(upcomingEvents);
      setIsRefreshing(false);
    } catch (err) {
      setError('Failed to load upcoming space events');
      console.error(err);
      setIsRefreshing(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleRefreshEvents = () => {
    setIsRefreshing(true);
    toast.success("Refreshing events", {
      description: "Fetching the latest cosmic happenings for the current month..."
    });
    loadEvents();
  };

  const handleViewEventDetails = (event: SpaceEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Background particle effect for shooting stars
  const ShootingStars = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-space-cream rounded-full"
            style={{
              top: `${Math.random() * 70}%`,
              left: '-5px',
            }}
            animate={{
              left: '105%',
              top: [`${Math.random() * 70}%`, `${Math.random() * 70 + 20}%`],
              width: [1, 3, 1],
              height: [1, 3, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  // Function to format dates nicely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      // Return the original if parsing fails
      return dateString;
    }
  };

  // Get current month and year for the button text
  const currentMonthYear = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="py-12 px-4 relative min-h-screen">
      <ShootingStars />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <p className="text-sm text-space-cream uppercase tracking-wider font-medium">Explore</p>
        <h1 className="text-3xl font-bold text-space-cream mt-1">Upcoming Space Events</h1>
        <p className="text-space-cream/70 mt-2 max-w-md mx-auto">
          Discover cosmic happenings, astronomical phenomena, and celestial events coming this month to our night sky.
        </p>
      </motion.div>

      <motion.div
        className="max-w-md mx-auto mb-8 glass-card p-4 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center justify-center">
          
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-gradient-to-r from-space-cream/10 to-white/5 hover:from-space-cream/20 hover:to-white/10 text-space-cream border-space-cream/20"
            onClick={handleRefreshEvents}
            disabled={isRefreshing || isLoading}
          >
            {isRefreshing ? (
              <>
                <motion.div 
                  className="w-4 h-4 border-2 border-space-cream/30 border-t-space-cream rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Refreshing...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                {currentMonthYear} Events
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-40">
          <motion.div 
            className="w-10 h-10 border-4 border-space-cream/20 border-t-space-cream rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-space-cream/70">Loading cosmic events...</p>
        </div>
      ) : error ? (
        <motion.div 
          className="bg-black/20 p-4 rounded-lg text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-space-cream">{error}</p>
          <Button 
            variant="secondary" 
            className="mt-4 bg-black/30 text-space-cream hover:bg-black/40"
            onClick={() => loadEvents()}
          >
            Try Again
          </Button>
        </motion.div>
      ) : events.length === 0 ? (
        <motion.div
          className="bg-black/20 p-6 rounded-lg text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Star className="w-12 h-12 text-space-cream/30 mx-auto mb-4" />
          <h3 className="text-xl text-space-cream mb-2">No Events Found</h3>
          <p className="text-space-cream/70">There are no upcoming space events during this period. Check back later for updates.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="h-full bg-black/30 border-space-cream/10 text-space-cream overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      // Fallback image if loading fails
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full text-xs text-space-cream">
                    {event.type}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center text-xs text-space-cream/70 mb-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(event.date)}
                  </div>
                  <CardTitle className="text-lg text-space-cream">{event.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="text-sm text-space-cream/80">
                  <p className="line-clamp-3">{event.description}</p>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-space-cream/30 bg-transparent hover:bg-space-cream/5 text-space-cream/80"
                    onClick={() => handleViewEventDetails(event)}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <EventDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default SpaceEvents;
