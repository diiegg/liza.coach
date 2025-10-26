import { Translations } from '@/lib/i18n';
import { FaqItem } from '../ui';

interface FaqProps {
  t: Translations;
}

export function Faq({ t }: FaqProps) {
  return (
    <section id="faq" className="py-20 lg:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-center">{t.faq.title}</h2>
        <dl className="mt-10 space-y-6">
          {t.faq.items.map((item, i) => (
            <FaqItem key={i} question={item.q} answer={item.a} />
          ))}
        </dl>
      </div>
    </section>
  );
}
