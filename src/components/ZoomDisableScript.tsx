
import React, { useEffect } from 'react';

const ZoomDisableScript: React.FC = () => {
  useEffect(() => {
    // Add meta viewport tag to disable zooming
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(metaViewport);
    
    // Add touch-action CSS to html and body
    document.documentElement.style.touchAction = 'pan-x pan-y';
    document.body.style.touchAction = 'pan-x pan-y';
    
    // Prevent zoom gestures
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', preventZoom, { passive: false });
    
    return () => {
      // Clean up
      document.head.removeChild(metaViewport);
      document.documentElement.style.touchAction = '';
      document.body.style.touchAction = '';
      document.removeEventListener('touchstart', preventZoom);
    };
  }, []);
  
  return null;
};

export default ZoomDisableScript;
