'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Smooth cursor follow
    const updateCursor = () => {
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;

      cursorX += diffX * 0.15;
      cursorY += diffY * 0.15;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    // Handle hover states
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover');

      if (isInteractive) {
        setIsHovering(true);

        // Check for custom cursor text
        const textAttr = target.getAttribute('data-cursor-text') ||
                        target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (textAttr) {
          setCursorText(textAttr);
        }

        // Magnetic effect
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.3,
          ease: 'power2.out',
        });

        // Subtle magnetic pull
        target.addEventListener('mousemove', (moveEvent: MouseEvent) => {
          const deltaX = (moveEvent.clientX - centerX) * 0.2;
          const deltaY = (moveEvent.clientY - centerY) * 0.2;
          gsap.to(target, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      setIsHovering(false);
      setCursorText('');

      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Reset magnetic effect
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to all interactive elements
    document.querySelectorAll('a, button, .cursor-hover').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Update cursor appearance based on state
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isClicking) {
      gsap.to(cursor, { scale: isHovering ? 2 : 0.8, duration: 0.1 });
    } else {
      gsap.to(cursor, { scale: isHovering ? 2.5 : 1, duration: 0.3 });
    }
  }, [isClicking, isHovering]);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] mix-blend-difference md:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } hidden`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
            isHovering ? 'border-white bg-white/10' : 'border-white'
          }`}
        >
          {cursorText && (
            <span className="text-[8px] font-bold uppercase tracking-wider text-white">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] md:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } hidden`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full rounded-full bg-white mix-blend-difference" />
      </div>
    </>
  );
}
