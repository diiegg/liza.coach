import { Translations } from '@/lib/i18n';
import { ServiceCard } from '../ui';

interface ServicesProps {
  t: Translations;
}

export function Services({ t }: ServicesProps) {
  return (
    <section id="services" className="py-[var(--space-section-sm)] lg:py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{t.services.title}</h2>
          <p className="mt-6 text-[var(--muted)] text-lg leading-relaxed">{t.services.sub}</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8 items-stretch">
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
