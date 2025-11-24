import { Translations } from '@/lib/i18n';
import { MethodStepCard } from '../ui/MethodStepCard';

interface MethodProps {
  t: Translations;
}

export function Method({ t }: MethodProps) {
  return (
    <section id="method" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{t.method.title}</h2>
          <p className="mt-2 text-[var(--muted)]">{t.method.sub}</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-5 gap-6 items-start">
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
