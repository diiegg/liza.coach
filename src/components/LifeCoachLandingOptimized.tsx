'use client';

import { useEffect, useState } from 'react';
import { Lang, translations } from '@/lib/i18n';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { SocialProof } from './sections/SocialProof';
import { Services } from './sections/Services';
import { About } from './sections/About';
import { Method } from './sections/Method';
import { Testimonials } from './sections/Testimonials';
import { Booking } from './sections/Booking';
import { Faq } from './sections/Faq';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export default function LifeCoachLandingOptimized() {
  const [lang, setLang] = useState<Lang>('en');

  // On first load, prefer saved choice or browser language
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem('lang')) as Lang | null;
    if (saved === 'en' || saved === 'ru') return setLang(saved);
    const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : '';
    if (nav.startsWith('ru')) setLang('ru');
  }, []);

  // Persist choice
  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <Header t={t} lang={lang} onLangChange={setLang} />
      <Hero t={t} lang={lang} />
      <SocialProof t={t} />
      <Services t={t} />
      <About t={t} />
      <Method t={t} />
      <Testimonials t={t} />
      <Booking t={t} />
      <Faq t={t} />
      <Contact t={t} lang={lang} />
      <Footer t={t} />
    </div>
  );
}
