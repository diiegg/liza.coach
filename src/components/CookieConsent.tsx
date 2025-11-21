'use client';

import { useState, useEffect } from 'react';

const translations = {
  ru: {
    title: '🍪 Мы ценим вашу конфиденциальность',
    message: 'Мы используем файлы cookie для улучшения вашего опыта, анализа трафика и персонализации контента. Нажимая «Принять», вы соглашаетесь с нашей политикой использования данных.',
    learnMore: 'Политика конфиденциальности',
    decline: 'Отклонить',
    accept: 'Принять',
  },
  en: {
    title: '🍪 We value your privacy',
    message: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.',
    learnMore: 'Privacy Policy',
    decline: 'Decline',
    accept: 'Accept',
  },
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'en'>('en');

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }

    // Detect language from HTML lang attribute or browser
    const htmlLang = document.documentElement.lang;
    if (htmlLang === 'ru') {
      setLanguage('ru');
    } else if (htmlLang === 'en') {
      setLanguage('en');
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith('ru') ? 'ru' : 'en');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Reload to enable analytics
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const t = translations[language];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 shadow-2xl border border-white/50 backdrop-blur-xl">
        <div className="flex flex-col gap-4">
          <div className="text-sm text-[var(--text)]">
            <p className="mb-2 font-serif text-lg font-medium text-[var(--brand-ink)]">
              {t.title}
            </p>
            <p className="leading-relaxed text-[var(--muted)]">
              {t.message}
            </p>
            <a
              href="/privacy-policy"
              className="mt-2 inline-block text-xs font-medium text-[var(--brand)] hover:text-[var(--brand-hover)] underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.learnMore}
            </a>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-[var(--muted)] bg-transparent border border-[var(--border)] hover:border-[var(--brand)] hover:text-[var(--brand)] rounded-xl transition-all duration-200"
            >
              {t.decline}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-hover)] shadow-lg shadow-[var(--brand)]/20 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
