import React, { useEffect, useRef, useState } from 'react';

const HexagonGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentIntensityRef = useRef(0);
  const targetIntensityRef = useRef(0);
  const lastMoveTimeRef = useRef(Date.now());

  // Config - Closer hexagons
  const HEX_SIZE = 18;           // Slightly smaller hexagon
  const SPACING_X = 38;          // Much closer horizontally (was 50)
  const SPACING_Y = 32;          // Much closer vertically (was 44)
  const EFFECT_RADIUS = 450;     // Slightly smaller radius for tighter effect
  const FADE_SPEED = 0.03;
  const FADE_DELAY = 100;

  // Draw a single hexagon
  const drawHexagon = (ctx: CanvasRenderingContext2D, cx: number, cy: number, opacity: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60 - 30) * Math.PI / 180;
      const x = cx + HEX_SIZE * Math.cos(angle);
      const y = cy + HEX_SIZE * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    
    ctx.fillStyle = `rgba(100, 150, 255, ${opacity * 0.1})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.2})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Draw the entire honeycomb
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, mouseX: number, mouseY: number, intensity: number) => {
    const cols = Math.ceil(width / SPACING_X) + 2;
    const rows = Math.ceil(height / SPACING_Y) + 2;

    for (let row = 0; row < rows; row++) {
      const shiftX = (row % 2 === 0) ? 0 : SPACING_X / 2;
      
      for (let col = 0; col < cols; col++) {
        const x = shiftX + col * SPACING_X;
        const y = row * SPACING_Y;
        
        // Calculate distance from mouse
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let opacity = 0;
        
        if (intensity > 0.01 && dist < EFFECT_RADIUS) {
          // Stronger fade at edges - using power of 2.5 for sharper dropoff
          const brightness = Math.pow(1 - (dist / EFFECT_RADIUS), 2.5);
          opacity = brightness * intensity;
          opacity = Math.min(0.95, opacity);
        }
        
        if (opacity > 0.01) {
          drawHexagon(ctx, x, y, opacity);
        }
      }
    }
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        targetIntensityRef.current = 1;
        lastMoveTimeRef.current = Date.now();
      }
    };

    const onMouseLeave = () => {
      targetIntensityRef.current = 0;
      lastMoveTimeRef.current = Date.now();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const timeSinceMove = Date.now() - lastMoveTimeRef.current;
      if (timeSinceMove > FADE_DELAY && targetIntensityRef.current > 0) {
        targetIntensityRef.current = 0;
      }
      
      currentIntensityRef.current += (targetIntensityRef.current - currentIntensityRef.current) * FADE_SPEED;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y, currentIntensityRef.current);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -9999
      }}
    />
  );
};

export default HexagonGridBackground;