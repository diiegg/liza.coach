import { Translations } from '@/lib/i18n';

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
        <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {t.method.steps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-[var(--brand)] text-white grid place-items-center font-semibold">
                {step.k}
              </div>
              <h3 className="mt-4 font-semibold">{step.t}</h3>
              {'subtitle' in step && <p className="mt-1 text-xs text-[var(--muted)] font-medium">{step.subtitle}</p>}
              <p className="mt-2 text-sm text-[var(--muted)]">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
