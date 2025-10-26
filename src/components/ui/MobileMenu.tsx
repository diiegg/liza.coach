'use client';

import { useState, useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
  bookLabel: string;
}

export function MobileMenu({ isOpen, onClose, navItems, bookLabel }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <nav
        className="fixed top-16 right-0 bottom-0 w-64 bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl z-50 md:hidden overflow-y-auto"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg font-medium hover:text-[var(--brand-ink)] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] rounded-lg px-2"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://calendly.com/meitol0407/30min?month=2025-10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium shadow hover:bg-[var(--brand-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 mt-4"
            onClick={onClose}
          >
            {bookLabel}
          </a>
        </div>
      </nav>
    </>
  );
}

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  label: string;
}

export function HamburgerButton({ isOpen, onClick, label }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-[var(--text)] hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition-colors"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        {isOpen ? (
          // X icon
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </>
        ) : (
          // Hamburger icon
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </>
        )}
      </svg>
    </button>
  );
}
