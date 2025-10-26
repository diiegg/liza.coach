export function SectionSkeleton() {
  return (
    <section className="py-20 lg:py-24 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-[var(--border)] rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-[var(--border)] rounded w-2/3 mb-8"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-[var(--border)] p-6">
              <div className="h-6 bg-[var(--border)] rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-[var(--border)] rounded w-full mb-2"></div>
              <div className="h-4 bg-[var(--border)] rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--border)] p-6 animate-pulse">
      <div className="h-6 bg-[var(--border)] rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-[var(--border)] rounded w-full mb-2"></div>
      <div className="h-4 bg-[var(--border)] rounded w-5/6 mb-4"></div>
      <div className="h-10 bg-[var(--border)] rounded w-1/3"></div>
    </div>
  );
}

export function SpinnerIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function LoadingSpinner({ 
  size = 'md',
  message = 'Loading...' 
}: { 
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12" role="status">
      <SpinnerIcon className={`text-[var(--brand)] ${sizeClasses[size]}`} />
      <span className="sr-only">{message}</span>
      <p className="mt-3 text-sm text-[var(--muted)]">{message}</p>
    </div>
  );
}
