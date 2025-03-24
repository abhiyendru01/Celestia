
import React, { useEffect, useRef } from 'react';

const StarField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing stars
    container.innerHTML = '';
    
    // Create stars
    const createStar = (size: string) => {
      const star = document.createElement('div');
      star.classList.add('star', `star-${size}`);
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random delay for twinkling
      star.style.setProperty('--star-delay', (Math.random() * 10).toString());
      
      return star;
    };

    // Add stars of different sizes
    const starCount = window.innerWidth < 768 ? 100 : 200;
    
    for (let i = 0; i < starCount; i++) {
      const sizeRand = Math.random();
      let size;
      
      if (sizeRand < 0.6) {
        size = 'small';
      } else if (sizeRand < 0.9) {
        size = 'medium';
      } else {
        size = 'large';
      }
      
      container.appendChild(createStar(size));
    }
    
    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      
      const stars = container.querySelectorAll('.star');
      stars.forEach((star, index) => {
        const depth = 0.5 + (index % 3) * 0.5; // Different depths for parallax
        (star as HTMLElement).style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="star-field" />;
};

export default StarField;
