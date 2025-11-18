import Image from 'next/image';
import { Translations } from '@/lib/i18n';
import { CheckIcon } from '../icons';

interface AboutProps {
  t: Translations;
}

export function About({ t }: AboutProps) {
  return (
    <section id="about" className="py-20 lg:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{t.about.title}</h2>
          <p className="mt-4 text-[var(--muted)]">{t.about.body}</p>
          <ul className="mt-6 space-y-3 text-[var(--muted)]">
            {t.about.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon className="mt-1 h-5 w-5 text-[var(--brand-ink)] flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <a 
              href="https://calendly.com/meitol0407/30min?month=2025-10"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium shadow hover:bg-[var(--brand-hover)] transition-colors"
            >
              {t.about.cta1}
            </a>
            <a 
              href="#method" 
              className="inline-flex items-center rounded-xl border px-6 py-3 font-medium border-[var(--border)] bg-[var(--surface)] hover:bg-[color:var(--surface)/0.9] transition-colors"
            >
              {t.about.cta2}
            </a>
          </div>
          {t.about.credentials && (
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <h3 className="text-sm font-semibold text-[var(--text)] mb-3">{t.about.credentialsTitle}</h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {t.about.credentials.map((credential, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 text-[var(--brand-ink)] flex-shrink-0" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl bg-[var(--tint-1)] p-2 shadow-xl">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src="/img/luna.webp"
                alt={t.about.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(min-width:1024px) 32rem, 100vw"
                loading="lazy"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-[color:var(--surface)/0.9] backdrop-blur rounded-2xl shadow-md border border-[var(--border)] px-4 py-3">
            <p className="text-sm">
              <strong>{t.about.stat}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
