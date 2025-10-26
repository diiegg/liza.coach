import { Translations } from '@/lib/i18n';

interface BookingProps {
  t: Translations;
}

export function Booking({ t }: BookingProps) {
  return (
    <section id="booking" className="py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{t.booking.title}</h2>
        <p className="mt-3 text-[var(--muted)] max-w-2xl mx-auto">{t.booking.sub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a 
            href="#contact" 
            className="inline-flex items-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium shadow hover:bg-[var(--brand-hover)] transition-colors"
          >
            {t.booking.cta1}
          </a>
          <a 
            href="#faq" 
            className="inline-flex items-center rounded-xl border px-6 py-3 font-medium border-[var(--border)] bg-[var(--surface)] hover:bg-[color:var(--surface)/0.95] transition-colors"
          >
            {t.booking.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}
