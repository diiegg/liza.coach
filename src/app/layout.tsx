// src/app/layout.tsx (Server Component - no "use client")
import './globals.css';
import type { Metadata } from 'next';
import { WebVitals } from '@/components/WebVitals';
import { CookieConsent } from '@/components/CookieConsent';
import { ConditionalAnalytics } from '@/components/ConditionalAnalytics';

export const metadata: Metadata = {
  title: 'Liza Coaching – Сертифицированный Life-коуч ICF | Лайф-коучинг для предпринимателей',
  description: 'Сертифицированный лайф-коуч с опытом 15+ лет. Помогаю предпринимателям и самозанятым выйти из застоя, найти фокус и начать зарабатывать от 50 000₽/месяц за 8 недель. Методика ОПОРА. 200+ клиентов. Сессии онлайн.',
  keywords: 'лайф коуч, life coach, коуч ICF, коучинг для предпринимателей, карьерный коучинг, личностный рост, коуч для самозанятых, бизнес коучинг, онлайн коучинг, сертифицированный коуч, life coaching Moscow, career coach Russia',
  authors: [{ name: 'Liza' }],
  creator: 'Liza Coaching',
  publisher: 'Liza Coaching',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://liza.coach'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ru-RU': '/ru',
    },
  },
  openGraph: {
    title: 'Liza Coaching – Сертифицированный Life-коуч ICF',
    description: 'Помогаю предпринимателям выйти из застоя и начать уверенно зарабатывать от 50 000₽/месяц. 200+ клиентов, 15+ лет опыта. Методика ОПОРА.',
    url: 'https://liza.coach',
    siteName: 'Liza Coaching',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: '/img/luna.webp',
        width: 1200,
        height: 630,
        alt: 'Лиза - Сертифицированный лайф-коуч ICF',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liza Coaching – Сертифицированный Life-коуч ICF',
    description: 'Помогаю предпринимателям выйти из застоя и начать уверенно зарабатывать. 200+ клиентов, 15+ лет опыта.',
    images: ['/img/luna.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="canonical" href="https://liza.coach" />
        <link rel="author" href="/humans.txt" />
        <meta name="geo.region" content="RU-MOW" />
        <meta name="geo.placename" content="Москва" />
        <meta name="geo.position" content="55.751244;37.618423" />
        <meta name="ICBM" content="55.751244, 37.618423" />
        
        {/* Analytics loaded conditionally via ConditionalAnalytics component based on cookie consent */}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://liza.coach/#person',
                  name: 'Лиза',
                  alternateName: 'Liza',
                  url: 'https://liza.coach',
                  image: {
                    '@type': 'ImageObject',
                    url: 'https://liza.coach/img/luna.webp',
                    width: 1200,
                    height: 630,
                  },
                  jobTitle: 'Сертифицированный лайф-коуч ICF',
                  description: 'Сертифицированный профессиональный лайф-коуч с опытом 15+ лет. Специализация: личностный рост, карьерное развитие, коучинг для предпринимателей и самозанятых.',
                  knowsLanguage: ['ru', 'en'],
                  alumniOf: 'ICF (International Coaching Federation)',
                  sameAs: [
                    'https://t.me/calmpro',
                    'https://t.me/lizadirect',
                  ],
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': 'https://liza.coach/#service',
                  name: 'Liza Coaching',
                  url: 'https://liza.coach',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://liza.coach/img/luna.webp',
                  },
                  image: 'https://liza.coach/img/luna.webp',
                  description: 'Профессиональные услуги лайф-коучинга для предпринимателей и самозанятых. Методика ОПОРА. Помогаем найти фокус, вернуть энергию и начать уверенно зарабатывать от 50 000₽ в месяц.',
                  priceRange: '5000₽ - 50000₽',
                  telephone: '@lizadirect',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'RU',
                    addressLocality: 'Москва',
                  },
                  areaServed: [
                    {
                      '@type': 'Country',
                      name: 'Россия',
                    },
                    {
                      '@type': 'Place',
                      name: 'Онлайн по всему миру',
                    },
                  ],
                  availableLanguage: [
                    {
                      '@type': 'Language',
                      name: 'Русский',
                      alternateName: 'Russian',
                    },
                    {
                      '@type': 'Language',
                      name: 'Английский',
                      alternateName: 'English',
                    },
                  ],
                  serviceType: [
                    'Лайф-коучинг',
                    'Карьерный коучинг',
                    'Коучинг для предпринимателей',
                    'Бизнес-коучинг',
                    'Личностный рост',
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Программы коучинга',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Разовая сессия',
                          description: 'Одна 60-минутная коуч-сессия для решения конкретной задачи',
                        },
                        price: '5000',
                        priceCurrency: 'RUB',
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Пакет "Фокус"',
                          description: '4 сессии на 1 месяц. Поможем определить цель и сделать первые шаги.',
                        },
                        price: '18000',
                        priceCurrency: 'RUB',
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Программа "Трансформация"',
                          description: '8 недель интенсивной работы. От застоя к стабильному доходу 50 000₽+',
                        },
                        price: '50000',
                        priceCurrency: 'RUB',
                      },
                    ],
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    ratingCount: '120',
                    bestRating: '5',
                    worstRating: '1',
                  },
                  provider: {
                    '@id': 'https://liza.coach/#person',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://liza.coach/#website',
                  url: 'https://liza.coach',
                  name: 'Liza Coaching',
                  description: 'Профессиональный лайф-коучинг для предпринимателей и самозанятых. Методика ОПОРА.',
                  publisher: {
                    '@id': 'https://liza.coach/#person',
                  },
                  inLanguage: ['ru', 'en'],
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://liza.coach/?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://liza.coach/#faq',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Какой у вас стиль коучинга?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Поддерживающий партнёрский коучинг: сильные вопросы + работа с телом, эмоциями и мыслями. Движение к жизни, где работа на себя радует и приносит доход?',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Проводите ли вы дистанционные сессии?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Да — все встречи проходят онлайн. Работаю с клиентами из разных часовых поясов.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Какие обязательства требуются?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Эффект будет даже после одной сессии; для более системного результата при поддержке выбирают 7–14 недель.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <ConditionalAnalytics />
        <WebVitals />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
