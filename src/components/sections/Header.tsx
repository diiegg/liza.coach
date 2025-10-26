'use client';

import { Lang, Translations } from '@/lib/i18n';

interface HeaderProps {
  t: Translations;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function Header({ t, lang, onLangChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg)/0.7] border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-2xl bg-[var(--brand)] grid place-items-center text-white font-semibold shadow-sm group-hover:shadow group-active:translate-y-px transition">
            LC
          </div>
          <span className="text-lg font-semibold tracking-tight">{t.brand}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#services" className="hover:text-[var(--brand-ink)] transition-colors">
            {t.nav.services}
          </a>
          <a href="#about" className="hover:text-[var(--brand-ink)] transition-colors">
            {t.nav.about}
          </a>
          <a href="#method" className="hover:text-[var(--brand-ink)] transition-colors">
            {t.nav.method}
          </a>
          <a href="#testimonials" className="hover:text-[var(--brand-ink)] transition-colors">
            {t.nav.results}
          </a>
          <a href="#contact" className="hover:text-[var(--brand-ink)] transition-colors">
            {t.nav.contact}
          </a>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-4 py-2 font-medium text-white shadow hover:bg-[var(--brand-hover)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.4] transition-colors"
          >
            {t.nav.book}
          </a>

          {/* Language dropdown */}
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
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}
