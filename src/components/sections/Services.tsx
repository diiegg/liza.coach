import { Translations } from '@/lib/i18n';
import { ServiceCard } from '../ui';

interface ServicesProps {
  t: Translations;
}

export function Services({ t }: ServicesProps) {
  return (
    <section id="services" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{t.services.title}</h2>
          <p className="mt-2 text-[var(--muted)]">{t.services.sub}</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6 items-stretch">
          {t.services.cards.map((card, i) => (
            <ServiceCard
              key={i}
              title={card.title}
              price={card.price}
              duration={'duration' in card ? card.duration : undefined}
              bullets={card.bullets}
              badge={'badge' in card ? card.badge : undefined}
              chooseLabel={'chooseLabel' in card ? card.chooseLabel : t.services.choose}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
