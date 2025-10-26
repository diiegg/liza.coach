import { Translations } from '@/lib/i18n';

interface FooterProps {
  t: Translations;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p>{t.footer.rights(new Date().getFullYear())}</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[var(--text)] transition-colors">
            {t.footer.privacy}
          </a>
          <a href="#" className="hover:text-[var(--text)] transition-colors">
            {t.footer.terms}
          </a>
          <a href="#" className="hover:text-[var(--text)] transition-colors">
            {t.footer.imprint}
          </a>
        </div>
      </div>
    </footer>
  );
}
