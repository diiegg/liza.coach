import { Translations } from '@/lib/i18n';
import { FaqItem } from '../ui';

interface FaqProps {
  t: Translations;
}

export function Faq({ t }: FaqProps) {
  return (
    <section id="faq" className="py-[var(--space-section-sm)] lg:py-[var(--space-section)] bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center">{t.faq.title}</h2>
        <dl className="mt-16 space-y-6">
          {t.faq.items.map((item, i) => (
            <FaqItem key={i} question={item.q} answer={item.a} />
          ))}
        </dl>
      </div>
    </section>
  );
}
