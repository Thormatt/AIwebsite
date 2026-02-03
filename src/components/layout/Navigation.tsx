'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/services', label: 'Services' },
  // { href: '/deliverables', label: 'Deliverables' }, // Hidden while in development
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([type="hidden"]):not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusable = () => {
      const menu = menuRef.current;
      if (!menu) return [];
      return Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
      );
    };

    const focusFirst = () => {
      const focusable = getFocusable();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        menuRef.current?.focus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && active === last) {
        first.focus();
        event.preventDefault();
      }
    };

    const raf = requestAnimationFrame(focusFirst);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isOpen, focusableSelector]);

  return (
    <>
      <nav className={cn('nav', isScrolled && 'nav-scrolled')}>
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-bold tracking-wider uppercase text-text-primary"
          >
            Thor<span className="text-gradient">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" className="btn btn-primary py-2 px-4 text-xs">
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            ref={menuButtonRef}
            className="md:hidden p-2"
            aria-label="Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-haspopup="dialog"
          >
            <div className="w-6 h-4 relative">
              <span
                className={cn(
                  'absolute left-0 w-full h-0.5 bg-text-primary transition-all',
                  isOpen ? 'top-2 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-2 w-full h-0.5 bg-text-primary transition-all',
                  isOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 w-full h-0.5 bg-text-primary transition-all',
                  isOpen ? 'top-2 -rotate-45' : 'top-4'
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        ref={menuRef}
        className={cn(
          'fixed inset-0 bg-bg-primary z-50 flex flex-col justify-center items-center gap-8 transition-all md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-display-md"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          onClick={() => setIsOpen(false)}
          className="btn btn-primary mt-4"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </>
  );
}
