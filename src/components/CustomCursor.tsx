import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const outerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="pointer"]') ||
        target.closest('.cyber-card')
      );
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth outer cursor following
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      outerRef.current.x += (position.x - outerRef.current.x) * 0.15;
      outerRef.current.y += (position.y - outerRef.current.y) * 0.15;
      
      const outer = document.getElementById('cursor-outer');
      if (outer) {
        outer.style.transform = `translate(${outerRef.current.x - 20}px, ${outerRef.current.y - 20}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [position]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Inner dot - follows exactly */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x - 4,
          top: position.y - 4,
        }}
      >
        <div
          className={`rounded-full bg-primary transition-all duration-200 ${
            isClicking ? 'w-2 h-2' : 'w-2 h-2'
          } ${isHovering ? 'scale-150' : 'scale-100'}`}
          style={{
            boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)',
          }}
        />
      </div>

      {/* Outer ring - follows with delay */}
      <div
        id="cursor-outer"
        className={`fixed pointer-events-none z-[9998] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: 0,
          top: 0,
          width: 40,
          height: 40,
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-300 ease-out ${
            isHovering
              ? 'border-primary scale-150 bg-primary/5'
              : 'border-primary/50 scale-100'
          } ${isClicking ? 'scale-75' : ''}`}
          style={{
            boxShadow: isHovering
              ? '0 0 20px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.1)'
              : '0 0 10px hsl(var(--primary) / 0.2)',
          }}
        />
        
        {/* Crosshair lines */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-50'}`}>
          <div className="absolute top-1/2 left-0 w-2 h-px bg-primary -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-2 h-px bg-primary -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 w-px h-2 bg-primary -translate-x-1/2" />
          <div className="absolute left-1/2 bottom-0 w-px h-2 bg-primary -translate-x-1/2" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
