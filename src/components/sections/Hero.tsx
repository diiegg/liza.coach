'use client';

import { Lang, Translations } from '@/lib/i18n';
import { StarIcon, ShieldIcon } from '../icons';

interface HeroProps {
  t: Translations;
  lang: Lang;
}

export function Hero({ t }: HeroProps) {
  return (
    <section className="relative overflow-clip">
      <div className="noise-overlay" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--tint-1)] blur-3xl opacity-60 animate-blob" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--accent)] blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-[var(--space-section-sm)] lg:py-[var(--space-section)] grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--tint-2)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-[var(--brand-ink)] mb-8 shadow-sm tracking-wide uppercase">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            {t.hero.chip}
          </p>
          <h1 className="text-5xl/tight md:text-6xl/tight lg:text-7xl/tight font-semibold tracking-tight">
            {t.hero.h1}
          </h1>
          <p className="mt-8 text-[var(--muted)] text-xl leading-relaxed">{t.hero.sub}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://calendly.com/meitol0407/30min?month=2025-10"
              target="_blank"
              rel="noopener noreferrer"
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
          <div className="mt-12 flex items-center gap-8 text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2.5">
              <StarIcon className="h-5 w-5 text-yellow-500" /> 
              <span className="font-medium">{t.hero.rating}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldIcon className="h-5 w-5 text-[var(--brand-ink)]" /> 
              <span className="font-medium">{t.hero.ethics}</span>
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
                <div className="glass-card mx-auto max-w-sm rounded-xl px-3 py-2 text-xs text-[var(--muted)]">
                  {t.videoInfo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
