'use client';

import { useState, useEffect } from 'react';

interface MethodStepCardProps {
  k: string;
  t: string;
  subtitle: string;
  d: string;
}

export function MethodStepCard({ k, t, subtitle, d }: MethodStepCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lang, setLang] = useState('ru');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const htmlLang = document.documentElement.lang;
    setLang(htmlLang || 'ru');
  }, []);

  useEffect(() => {
    if (isExpanded && !isHovering) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 60000); // 1 minute

      return () => clearTimeout(timer);
    }
  }, [isExpanded, isHovering]);

  const learnMoreText = lang === 'en' ? 'Learn more' : 'Узнать больше';
  const hideText = lang === 'en' ? 'Hide' : 'Скрыть';

  return (
    <div 
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm h-full flex flex-col"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-xl bg-[var(--brand)] text-white grid place-items-center font-semibold">
          {k}
        </div>
        <h3 className="mt-4 font-semibold">{t}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>
      </div>
      
      {/* Expandable content */}
      <div className="flex-shrink-0">
        {isExpanded && (
          <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-[var(--muted)] leading-relaxed">{d}</p>
          </div>
        )}
      </div>
      
      {/* Spacer */}
      <div className="flex-grow min-h-[1rem]"></div>
      
      {/* Learn more button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex-shrink-0 text-sm text-[var(--brand)] hover:text-[var(--brand-hover)] font-medium flex items-center gap-1 transition-colors"
      >
        {isExpanded ? (
          <>
            {hideText}
            <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            {learnMoreText}
            <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
