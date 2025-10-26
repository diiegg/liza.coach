'use client';

import { useState, useEffect } from 'react';
import { Lang, Translations } from '@/lib/i18n';
import { HamburgerButton, MobileMenu } from '../ui/MobileMenu';

interface HeaderProps {
  t: Translations;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function Header({ t, lang, onLangChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLanguageHint, setShowLanguageHint] = useState(false);

  // Show hint for auto-detected language (only once per session)
  useEffect(() => {
    const hasSeenHint = sessionStorage.getItem('languageHintSeen');
    const savedLang = localStorage.getItem('lang');
    
    // Show hint if language was auto-detected (not manually saved before)
    if (!hasSeenHint && !savedLang && typeof window !== 'undefined') {
      setShowLanguageHint(true);
      sessionStorage.setItem('languageHintSeen', 'true');
      
      // Hide hint after 5 seconds
      setTimeout(() => setShowLanguageHint(false), 5000);
    }
  }, []);

  const navItems = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.method, href: '#method' },
    { label: t.nav.results, href: '#testimonials' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg)/0.7] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-2xl bg-[var(--brand)] grid place-items-center text-white font-semibold shadow-sm group-hover:shadow group-active:translate-y-px transition">
              LC
            </div>
            <span className="text-lg font-semibold tracking-tight">{t.brand}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[var(--brand-ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand)] rounded px-2 py-1"
              >
                {item.label}
              </a>
            ))}
          {/* Book a Call Button */}
          <a
            href="https://calendly.com/meitol0407/30min?month=2025-10"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[var(--brand)] px-4 py-2 text-white text-sm font-medium hover:bg-[var(--brand-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2"
          >
            {t.nav.book}
          </a>            {/* Language dropdown */}
            <div className="relative">
              <label className="sr-only" htmlFor="lang-select">
                {t.langLabel}
              </label>
              <select
                id="lang-select"
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-sm hover:bg-[color:var(--surface)/0.95] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.25] cursor-pointer transition-colors"
                value={lang}
                onChange={(e) => onLangChange(e.target.value as Lang)}
              >
                <option value="en">🇬🇧 English</option>
                <option value="ru">🇷🇺 Русский</option>
              </select>
              
              {/* Auto-detection hint */}
              {showLanguageHint && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--brand)] text-white text-xs rounded-lg shadow-lg p-2 z-50 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <span className="text-base">🌐</span>
                    <p>
                      {lang === 'ru' 
                        ? 'Язык определён автоматически' 
                        : 'Language auto-detected'}
                    </p>
                  </div>
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-[var(--brand)] rotate-45"></div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <select
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.25]"
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Lang)}
              aria-label={t.langLabel}
            >
              <option value="en">🇬🇧 EN</option>
              <option value="ru">🇷🇺 RU</option>
            </select>
            <HamburgerButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            />
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        bookLabel={t.nav.book}
      />
    </>
  );
}
