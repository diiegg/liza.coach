import { QuoteIcon } from '../icons';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <figure className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="flex gap-2 text-[var(--brand-ink)]">
        <QuoteIcon className="h-5 w-5" />
        <QuoteIcon className="h-5 w-5 -scale-x-100" />
      </div>
      <blockquote className="mt-3 text-[var(--text)]">"{quote}"</blockquote>
      <figcaption className="mt-4 text-sm text-[var(--muted)]">
        {name} · {role}
      </figcaption>
    </figure>
  );
}
