interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <figure className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[var(--brand-ink)]/20 relative overflow-hidden">
      <div className="absolute top-4 left-4 text-6xl leading-none text-[var(--brand-ink)]/10 font-serif select-none">
        &ldquo;
      </div>
      <blockquote className="relative text-[var(--text)] text-base leading-relaxed pt-4">
        {quote}
      </blockquote>
      <figcaption className="mt-6 pt-4 border-t border-[var(--border)]/50">
        <div className="font-medium text-[var(--text)]">{name}</div>
        <div className="text-sm text-[var(--muted)] mt-1">{role}</div>
      </figcaption>
    </figure>
  );
}
