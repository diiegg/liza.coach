'use client';

import { useEffect, useState } from 'react';
import { Lang, translations } from '@/lib/i18n';
import { detectUserLanguage, saveLanguagePreference } from '@/lib/languageDetection';
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Enhanced language detection on first load
  useEffect(() => {
    const detectedLang = detectUserLanguage();
    setLang(detectedLang);
    setIsInitialized(true);
  }, []);

  // Persist language choice when user manually changes it
  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    saveLanguagePreference(newLang);
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen" lang={lang}>
      <Header t={t} lang={lang} onLangChange={handleLangChange} />
      <main id="main-content" role="main">
        <Hero t={t} lang={lang} />
        <SocialProof t={t} />
        <Services t={t} />
        <About t={t} />
        <Method t={t} />
        <Testimonials t={t} />
        <Booking t={t} />
        <Faq t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} />
    </div>
  );
}
