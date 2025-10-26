'use client';

import { Lang, Translations } from '@/lib/i18n';
import { MailIcon, GlobeIcon, CalendarIcon } from '../icons';

interface ContactProps {
  t: Translations;
  lang: Lang;
}

export function Contact({ t, lang }: ContactProps) {
  return (
    <section id="contact" className="py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{t.contact.title}</h2>
          <p className="mt-3 text-[var(--muted)]">{t.contact.sub}</p>
          <div className="mt-6 space-y-3 text-[var(--muted)]">
            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-[var(--brand-ink)] flex-shrink-0" />
              {t.contact.emailAddress}
            </div>
            <div className="flex items-center gap-3">
              <GlobeIcon className="h-5 w-5 text-[var(--brand-ink)] flex-shrink-0" />
              {t.contact.site}
            </div>
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-[var(--brand-ink)] flex-shrink-0" />
              {t.contact.hours}
            </div>
          </div>
        </div>
        <form className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">{t.contact.first}</label>
              <input
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3] transition-shadow"
                placeholder={lang === 'ru' ? 'Анна' : 'Jane'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">{t.contact.last}</label>
              <input
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3] transition-shadow"
                placeholder={lang === 'ru' ? 'Иванова' : 'Doe'}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">{t.contact.email}</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3] transition-shadow"
                placeholder="you@example.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">{t.contact.message}</label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3] transition-shadow"
                placeholder={t.contact.placeholder}
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-4 inline-flex items-center rounded-xl bg-[var(--brand)] px-5 py-2.5 text-white font-medium hover:bg-[var(--brand-hover)] transition-colors"
          >
            {t.contact.send}
          </button>
          <p className="mt-3 text-xs text-[var(--muted)]">{t.contact.policy}</p>
        </form>
      </div>
    </section>
  );
}
