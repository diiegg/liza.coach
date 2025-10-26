interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="font-medium">{question}</div>
      <p className="mt-2 text-[var(--muted)] text-sm">{answer}</p>
    </div>
  );
}
