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
  const testimonials = 'items' in t.testimonials ? t.testimonials.items : [
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
      className="py-20 lg:py-24 bg-gradient-to-b from-[var(--surface)] to-[color:var(--tint-1)/0.4] border-y border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{t.testimonials.title}</h2>
          <p className="mt-2 text-[var(--muted)]">{t.testimonials.sub}</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
