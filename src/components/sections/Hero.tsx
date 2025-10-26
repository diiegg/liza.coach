'use client';

import { Lang, Translations } from '@/lib/i18n';
import { StarIcon, ShieldIcon } from '../icons';

interface HeroProps {
  t: Translations;
  lang: Lang;
}

export function Hero({ t, lang }: HeroProps) {
  return (
    <section className="relative overflow-clip">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--tint-1)] blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--accent)] blur-3xl opacity-60" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--tint-2)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--brand-ink)] mb-5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
            {t.hero.chip}
          </p>
          <h1 className="text-4xl/tight md:text-5xl font-semibold tracking-tight">
            {t.hero.h1}
          </h1>
          <p className="mt-4 text-[var(--muted)] text-lg">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium shadow hover:bg-[var(--brand-hover)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.4] transition-colors"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--surface)] px-6 py-3 text-[var(--text)] font-medium border border-[var(--border)] hover:border-[var(--border)]/80 transition-colors"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-[var(--brand-ink)]" /> {t.hero.rating}
            </div>
            <div className="flex items-center gap-2">
              <ShieldIcon className="h-5 w-5 text-[var(--brand-ink)]" /> {t.hero.ethics}
            </div>
          </div>
        </div>
        
        {/* Right panel: autoplay intro video (centered) */}
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-tr from-[var(--tint-1)] via-[var(--surface)] to-[var(--accent)] p-2 shadow-xl">
            <div className="relative h-full w-full overflow-hidden rounded-2xl grid place-items-center bg-[var(--surface)]">
              <video
                className="h-full w-full object-cover object-center"
                playsInline
                autoPlay
                muted
                loop
                preload="metadata"
                poster="/video/2video-poster.webp"
                aria-label={t.videoAriaLabel}
                onEnded={(e) => {
                  // Fallback to restart video if loop fails
                  e.currentTarget.currentTime = 0;
                  e.currentTarget.play();
                }}
              >
                <source 
                  src="/video/2intro-720p.mp4" 
                  type="video/mp4" 
                  media="(min-width: 768px)"
                />
                <source 
                  src="/video/2intro-480p.mp4" 
                  type="video/mp4" 
                />
              </video>
              {/* Soft info pill */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
                <div className="mx-auto max-w-sm rounded-xl bg-[color:var(--surface)/0.75] backdrop-blur border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)]">
                  {t.videoInfo}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-[color:var(--surface)/0.9] backdrop-blur rounded-2xl shadow-md border border-[var(--border)] px-4 py-3">
            <p className="text-sm">
              <strong>{t.hero.cohort}</strong> {t.cohortStarts}{' '}
              <span className="text-[var(--brand-ink)]">{t.hero.cohortDate}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
