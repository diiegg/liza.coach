interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="font-semibold text-lg text-[var(--text)]">{question}</div>
      <p className="mt-4 text-[var(--muted)] text-base leading-relaxed">{answer}</p>
    </div>
  );
}
