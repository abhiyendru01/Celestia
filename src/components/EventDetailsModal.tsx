
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Telescope, Info } from 'lucide-react';
import { motion } from 'framer-motion';

type EventDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  event: {
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
  } | null;
};

const EventDetailsModal: React.FC<EventDetailsProps> = ({ isOpen, onClose, event }) => {
  if (!event) return null;
  
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
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black/90 border-space-cream/20 text-space-cream max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="h-48 md:h-64 overflow-hidden rounded-t-lg -mt-6 -mx-6">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full text-xs text-space-cream">
            {event.type}
          </div>
        </div>
        
        <DialogHeader className="pt-4">
          <div className="flex items-center text-sm text-space-cream/70 mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(event.date)}
          </div>
          <DialogTitle className="text-2xl text-space-cream">{event.title}</DialogTitle>
          <DialogDescription className="text-space-cream/80">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-space-cream/70 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-space-cream">Location</h4>
                <p className="text-sm text-space-cream/80">{event.location}</p>
              </div>
            </div>
          )}
          
          {event.equipment && (
            <div className="flex items-start gap-3">
              <Telescope className="w-5 h-5 text-space-cream/70 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-space-cream">Recommended Equipment</h4>
                <p className="text-sm text-space-cream/80">{event.equipment}</p>
              </div>
            </div>
          )}
          
          {event.duration && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-space-cream/70 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-space-cream">Duration</h4>
                <p className="text-sm text-space-cream/80">{event.duration}</p>
              </div>
            </div>
          )}
          
          {event.fullDetails && (
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-space-cream/70 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-space-cream">Full Details</h4>
                <p className="text-sm text-space-cream/80">{event.fullDetails}</p>
              </div>
            </div>
          )}
          
          {event.relatedEvents && event.relatedEvents.length > 0 && (
            <div className="mt-4 bg-black/40 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-space-cream mb-2">Related Information</h4>
              <ul className="space-y-1">
                {event.relatedEvents.map((related, index) => (
                  <li key={index} className="text-sm text-space-cream/70 flex items-center">
                    <span className="w-1.5 h-1.5 bg-space-cream/50 rounded-full mr-2"></span>
                    {related}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-space-cream/10 to-white/5 hover:from-space-cream/20 hover:to-white/10 text-space-cream border border-space-cream/20"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
