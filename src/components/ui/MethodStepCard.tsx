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
      className={`glass-card rounded-3xl p-7 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5 ${
        isExpanded ? 'min-h-[460px]' : 'min-h-[340px]'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Icon and Title */}
      <div className="flex-shrink-0">
        <div className="h-14 w-14 rounded-2xl bg-[var(--brand)] text-white grid place-items-center font-bold text-xl shadow-sm">
          {k}
        </div>
        <h3 className="mt-5 font-semibold text-xl tracking-tight leading-tight">{t}</h3>
        <p className="mt-3 text-[var(--muted)] leading-relaxed text-[15px]">{subtitle}</p>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="flex-shrink-0 mt-5 pt-5 border-t border-[var(--border)]/30">
          <p className="text-[var(--muted)] leading-relaxed text-[15px]">{d}</p>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-grow min-h-[2rem]"></div>

      {/* Learn more button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex-shrink-0 text-[13px] text-[var(--brand)] hover:text-[var(--brand-hover)] font-semibold flex items-center gap-1.5 transition-all hover:gap-2 tracking-wide uppercase"
      >
        {isExpanded ? (
          <>
            {hideText}
            <svg className="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            {learnMoreText}
            <svg className="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
