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
    <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300" data-testid="service-card">
      {badge && (
        <div className="absolute -top-4 left-6 bg-[color:var(--surface)/0.95] backdrop-blur rounded-2xl shadow-md border border-[var(--border)] px-5 py-2">
          <p className="text-sm font-semibold tracking-wide">{badge}</p>
        </div>
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-[var(--muted)] text-lg font-medium">{price}</p>
      {duration && <p className="mt-1 text-sm text-[var(--muted)]">{duration}</p>}
      <ul className="mt-8 space-y-3 text-sm text-[var(--muted)] leading-relaxed flex-grow">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckIcon className="mt-0.5 h-4 w-4 text-[var(--brand-ink)] flex-shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://calendly.com/meitol0407/30min?month=2025-10"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium hover:bg-[var(--brand-hover)] transition-all hover:scale-[1.02] w-full"
      >
        {chooseLabel}
      </a>
    </div>
  );
}
