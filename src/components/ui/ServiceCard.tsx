import { CheckIcon } from '../icons';

interface ServiceCardProps {
  title: string;
  price: string;
  duration?: string;
  bullets: readonly string[];
  badge?: string;
  chooseLabel: string;
}

export function ServiceCard({ title, price, duration, bullets, badge, chooseLabel }: ServiceCardProps) {
  return (
    <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm flex flex-col h-full" data-testid="service-card">
      {badge && (
        <div className="absolute -top-4 left-4 bg-[color:var(--surface)/0.9] backdrop-blur rounded-2xl shadow-md border border-[var(--border)] px-4 py-2">
          <p className="text-sm font-semibold">{badge}</p>
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-[var(--muted)]">{price}</p>
      {duration && <p className="text-sm text-[var(--muted)]">{duration}</p>}
      <ul className="mt-4 space-y-2 text-sm text-[var(--muted)] flex-grow">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 h-4 w-4 text-[var(--brand-ink)] flex-shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
      <a
        href="https://calendly.com/meitol0407/30min?month=2025-10"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-4 py-2 text-white font-medium hover:bg-[var(--brand-hover)] transition-colors w-full"
      >
        {chooseLabel}
      </a>
    </div>
  );
}
