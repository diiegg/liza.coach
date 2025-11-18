import LifeCoachLandingOptimized from '@/components/LifeCoachLandingOptimized';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liza Coaching – Сертифицированный Life-коуч ICF | Лайф-коучинг для предпринимателей',
  description: 'Сертифицированный лайф-коуч с опытом 15+ лет. Помогаю предпринимателям и самозанятым выйти из застоя, найти фокус и начать зарабатывать от 50 000₽/месяц за 8 недель. Методика ОПОРА. 200+ клиентов.',
  alternates: {
    canonical: 'https://liza.coach',
  },
};

export default function Home() {
  return (
    <ErrorBoundary>
      <main id="main-content" role="main">
        <LifeCoachLandingOptimized />
      </main>
    </ErrorBoundary>
  );
}
