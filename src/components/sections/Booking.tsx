import { Translations } from '@/lib/i18n';

interface BookingProps {
  t: Translations;
}

export function Booking({ t }: BookingProps) {
  return (
    <section id="booking" className="py-20 lg:py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--tint-1)] blur-3xl opacity-40" />
      </div>
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--tint-2)] bg-[var(--surface)] px-4 py-2 text-sm mb-6 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-medium text-[var(--brand-ink)]">
            {t.booking.urgency || '⚡ Limited Spots Available This Month'}
          </span>
        </div>
        
        <h2 className="text-3xl font-semibold tracking-tight">{t.booking.title}</h2>
        <p className="mt-3 text-[var(--muted)] max-w-2xl mx-auto">{t.booking.sub}</p>
        
        {/* Social Proof */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span><strong>200+</strong> {'clientsHelped' in t.booking ? t.booking.clientsHelped : 'clients helped'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span><strong>4.9/5</strong> {'rating' in t.booking ? t.booking.rating : 'rating'}</span>
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a 
            href="https://calendly.com/meitol0407/30min?month=2025-10"
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center rounded-xl bg-[var(--brand)] px-8 py-4 text-white font-semibold shadow-lg hover:bg-[var(--brand-hover)] transition-all hover:scale-105"
          >
            {t.booking.cta1}
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a 
            href="#faq" 
            className="inline-flex items-center rounded-xl border px-6 py-4 font-medium border-[var(--border)] bg-[var(--surface)] hover:bg-[color:var(--surface)/0.95] transition-colors"
          >
            {t.booking.cta2}
          </a>
        </div>
        
        {/* Trust indicators */}
        <p className="mt-6 text-xs text-[var(--muted)]">
          {'trustIndicators' in t.booking ? t.booking.trustIndicators : '✓ Free 30-minute consultation • ✓ No credit card required • ✓ Cancel anytime'}
        </p>
      </div>
    </section>
  );
}
