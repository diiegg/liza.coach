import { Translations } from '@/lib/i18n';

interface SocialProofProps {
  t: Translations;
}

export function SocialProof({ t }: SocialProofProps) {
  return (
    <section className="py-8 border-y border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-[var(--muted)]">
        <div>
          {t.proof.feat} <span className="font-medium text-[var(--text)]">{t.proof.mindful}</span>
        </div>
        <div>
          {t.proof.founders} <span className="font-medium text-[var(--text)]">{t.proof.foundersWho}</span>
        </div>
        <div>
          {t.proof.roi} <span className="font-medium text-[var(--text)]">{t.proof.weeks}</span>
        </div>
        <div>
          {t.proof.sessions} <span className="font-medium text-[var(--text)]">{t.proof.sessionsCount}</span>
        </div>
      </div>
    </section>
  );
}
