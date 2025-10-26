// src/app/layout.tsx (Server Component - no "use client")
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liza Coaching – Certified Life & Career Coach | Transform Your Life',
  description: 'Certified professional life coach specializing in personal growth, career development, and goal achievement. 15+ years of experience helping clients unlock their potential. Sessions in English and Russian.',
  keywords: 'life coach, career coaching, personal development, goal setting, professional coach, certified coach, life transformation, career guidance, coaching sessions',
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
    title: 'Liza Coaching – Certified Life & Career Coach',
    description: 'Transform your life with certified professional coaching. Specializing in personal growth, career development, and achieving your goals. 15+ years of experience.',
    url: 'https://liza.coach',
    siteName: 'Liza Coaching',
    locale: 'en_US',
    alternateLocale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/img/luna.webp',
        width: 1200,
        height: 630,
        alt: 'Liza - Certified Professional Life Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liza Coaching – Certified Life & Career Coach',
    description: 'Transform your life with certified professional coaching. Personal growth, career development, and goal achievement.',
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://liza.coach/#person',
                  name: 'Liza',
                  url: 'https://liza.coach',
                  image: {
                    '@type': 'ImageObject',
                    url: 'https://liza.coach/img/luna.webp',
                    width: 1200,
                    height: 630,
                  },
                  jobTitle: 'Certified Life & Career Coach',
                  description: 'Certified professional life coach with 15+ years of experience specializing in personal growth, career development, and goal achievement.',
                  knowsLanguage: ['en', 'ru'],
                  sameAs: [
                    // Add your social media profiles when ready
                    // 'https://linkedin.com/in/yourprofile',
                    // 'https://instagram.com/yourprofile',
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
                  description: 'Professional life coaching services specializing in personal growth, career development, and goal achievement. Certified coach with 15+ years of experience.',
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'Online',
                  },
                  areaServed: {
                    '@type': 'Place',
                    name: 'Worldwide',
                  },
                  availableLanguage: [
                    {
                      '@type': 'Language',
                      name: 'English',
                    },
                    {
                      '@type': 'Language',
                      name: 'Russian',
                    },
                  ],
                  serviceType: [
                    'Life Coaching',
                    'Career Coaching',
                    'Personal Development',
                    'Goal Setting',
                  ],
                  provider: {
                    '@id': 'https://liza.coach/#person',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://liza.coach/#website',
                  url: 'https://liza.coach',
                  name: 'Liza Coaching',
                  description: 'Professional life coaching services for personal growth and career development',
                  publisher: {
                    '@id': 'https://liza.coach/#person',
                  },
                  inLanguage: ['en', 'ru'],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
