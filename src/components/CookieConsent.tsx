'use client';

import { useState, useEffect } from 'react';

const translations = {
  ru: {
    title: '🍪 Мы используем cookie',
    message: 'Мы используем файлы cookie и аналогичные технологии для анализа трафика сайта и улучшения вашего опыта. Мы используем аналитику, ориентированную на конфиденциальность (Umami), которая не отслеживает личные данные.',
    learnMore: 'Узнать больше',
    decline: 'Отклонить',
    accept: 'Принять',
  },
  en: {
    title: '🍪 We use cookies',
    message: 'We use cookies and similar technologies to analyze website traffic and improve your experience. We use privacy-focused analytics (Umami) that doesn\'t track personal data.',
    learnMore: 'Learn more',
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm md:text-base text-gray-700">
            <p className="mb-2">
              <strong>{t.title}</strong>
            </p>
            <p>
              {t.message}
              {' '}
              <a
                href="/privacy-policy"
                className="text-blue-600 hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.learnMore}
              </a>
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {t.decline}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
