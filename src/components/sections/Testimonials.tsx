import { Translations } from '@/lib/i18n';
import { TestimonialCard } from '../ui';

interface TestimonialsProps {
  t: Translations;
}

const testimonials = [
  {
    quote: 'I landed the role I was dreaming of and finally built a routine I can stick to.',
    name: 'Sara P.',
    role: 'Product Manager',
  },
  {
    quote: 'Weekly sessions kept me accountable — I shipped my app in 6 weeks.',
    name: 'Jonas K.',
    role: 'Founder',
  },
  {
    quote: 'I stopped second-guessing and started executing with ease.',
    name: 'Anya R.',
    role: 'Designer',
  },
];

export function Testimonials({ t }: TestimonialsProps) {
  // Use localized testimonials if available, otherwise fallback to English defaults
  const items = 'items' in t.testimonials ? t.testimonials.items : [
    {
      quote: 'I landed the role I was dreaming of and finally built a routine I can stick to.',
      name: 'Sara P.',
      role: 'Product Manager',
    },
    {
      quote: 'Weekly sessions kept me accountable — I shipped my app in 6 weeks.',
      name: 'Jonas K.',
      role: 'Founder',
    },
    {
      quote: 'I stopped second-guessing and started executing with ease.',
      name: 'Anya R.',
      role: 'Designer',
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-[var(--space-section-sm)] lg:py-[var(--space-section)] bg-gradient-to-b from-[var(--surface)] to-[color:var(--tint-1)/0.4] border-y border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{t.testimonials.title}</h2>
          <p className="mt-6 text-[var(--muted)] text-lg leading-relaxed">{t.testimonials.sub}</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {items.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
