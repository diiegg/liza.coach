import { Translations } from '@/lib/i18n';
import { MethodStepCard } from '../ui/MethodStepCard';

interface MethodProps {
  t: Translations;
}

export function Method({ t }: MethodProps) {
  return (
    <section id="method" className="py-[var(--space-section-sm)] lg:py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{t.method.title}</h2>
          <p className="mt-6 text-[var(--muted)] text-lg leading-relaxed">{t.method.sub}</p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start">
          {t.method.steps.map((step, i) => (
            <MethodStepCard
              key={i}
              k={step.k}
              t={step.t}
              subtitle={step.subtitle}
              d={step.d}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
