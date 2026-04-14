import React, { useEffect, useRef, useState } from 'react';

const AnimatedDotBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const targetIntensityRef = useRef(0);
  const currentIntensityRef = useRef(0);
  const lastMoveTimeRef = useRef(Date.now());
  const dotsRef = useRef<{ x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Configuration
  const DOT_SPACING = 14; // Space between dots horizontally and vertically
  const DOT_SIZE = 1;
  const MAX_RADIUS = 200;
  const FADE_DELAY_MS = 400;

  // Generate dots in a perfect grid (like ::::::)
  const generateDots = (width: number, height: number) => {
    const dots: { x: number; y: number }[] = [];
    
    // Start from 0, not centered, to create perfect rows and columns
    for (let y = DOT_SPACING; y < height; y += DOT_SPACING) {
      for (let x = DOT_SPACING; x < width; x += DOT_SPACING) {
        dots.push({ x, y });
      }
    }
    
    return dots;
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        dotsRef.current = generateDots(width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mouseRef.current = { x, y, active: true };
          targetIntensityRef.current = 1;
          lastMoveTimeRef.current = Date.now();
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      targetIntensityRef.current = 0;
      lastMoveTimeRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation and fade logic
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTimeRef.current;
      
      if (timeSinceLastMove > FADE_DELAY_MS && targetIntensityRef.current > 0) {
        targetIntensityRef.current = 0;
      }
      
      currentIntensityRef.current += (targetIntensityRef.current - currentIntensityRef.current) * 0.1;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw all dots
      dotsRef.current.forEach(dot => {
        let opacity = 0.12; // Base opacity
        
        // Apply mouse effect
        if (mouseRef.current.active && currentIntensityRef.current > 0.01) {
          const dx = dot.x - mouseRef.current.x;
          const dy = dot.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < MAX_RADIUS) {
            // Intensity: 1 at center, 0 at edge
            const intensity = Math.pow(1 - Math.min(1, distance / MAX_RADIUS), 1.5);
            const effectStrength = intensity * currentIntensityRef.current;
            opacity = Math.min(0.95, 0.08 + effectStrength * 0.87);
          }
        }
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${opacity})`;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default AnimatedDotBackground;