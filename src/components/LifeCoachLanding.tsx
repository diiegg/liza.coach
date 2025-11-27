'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { MethodStepCard } from './ui/MethodStepCard';

type Lang = 'en' | 'ru';

const copy = {
  en: {
    brand: 'Liza Coaching',
    nav: { services: 'Services', about: 'About', method: 'Method', results: 'Results', contact: 'Contact', book: 'Book a Call' },
    hero: {
      chip: '1:1 & Group Coaching · Free Discovery Call',
      h1: 'Clarity. Confidence. Consistent Action.',
      sub: 'I help ambitious people get unstuck, design aligned goals, and build the habits to reach them — without burning out.',
      ctaPrimary: 'Book a free call',
      ctaSecondary: 'Explore programs',
      rating: '4.9/5 from 120+ clients',
      ethics: 'ICF-aligned ethics',
      cohort: 'Next cohort',
      cohortDate: 'Nov 3',
    },
    proof: {
      feat: 'Featured in',
      founders: 'Trusted by',
      foundersWho: 'Startup founders',
      roi: 'Avg. ROI',
      weeks: '6–12 weeks',
      sessions: 'Sessions delivered',
      sessionsCount: '2k+',
      mindful: 'Mindful Weekly',
    },
    services: {
      title: 'Coaching offers',
      sub: 'Flexible formats designed around your goals and schedule.',
      cards: [
        { title: '1:1 Deep-Dive', price: '€149 / session', bullets: ['60-min on Zoom', 'Personal roadmap', 'Voxer support 5 days'], badge: 'Most popular' },
        { title: 'Momentum Pack', price: '€799 / 6 weeks', bullets: ['Weekly 50-min', 'Habit tracker', 'Accountability notes'] },
        { title: 'Clarity Day', price: '€950 / day', bullets: ['Half-day intensive', 'Values & vision map', '90-day action plan'] },
      ],
      choose: 'Choose',
    },
    about: {
      title: 'Meet Liza',
      body: 'Certified life coach, former product lead, and lifelong student of behavior change. I combine coaching, positive psychology, and practical systems to help you turn insight into action.',
      bullets: [
        'ICF-aligned training with 500+ coaching hours',
        'Evidence-based tools: CBT, WOOP, Tiny Habits',
        'Trauma-aware, inclusive, and confidential',
      ],
      cta1: 'Book intro call',
      cta2: 'How I work',
      stat: 'Clients in 12+ countries',
    },
    method: {
      title: 'The CALM Framework',
      sub: 'A simple path we’ll follow together.',
      steps: [
        { k: 'C', t: 'Clarify', d: 'Define what you really want and why it matters.', subtitle: 'Define what you really want.' },
        { k: 'A', t: 'Align', d: 'Map goals to values and constraints.', subtitle: 'Align goals with values.' },
        { k: 'L', t: 'Leverage', d: 'Design tiny, repeatable systems that compound.', subtitle: 'Build repeatable systems.' },
        { k: 'M', t: 'Measure', d: 'Track progress, review, and adjust with support.', subtitle: 'Track and adjust.' },
      ],
    },
    testimonials: { title: 'Client results', sub: 'Real stories from coaching engagements.' },
    booking: {
      title: 'Ready to get unstuck?',
      sub: 'Book a free 20-minute discovery call. We’ll explore your goals and see if it’s a fit. No pressure.',
      cta1: 'Request a call',
      cta2: 'See FAQs',
    },
    faq: {
      title: 'FAQs',
      items: [
        { q: 'What’s your coaching style?', a: 'Supportive yet direct. I’ll ask powerful questions, reflect patterns, and co-design simple experiments that move you forward.' },
        { q: 'Do you offer remote sessions?', a: 'Yes — all sessions are online. I coach clients across time zones.' },
        { q: 'What’s the commitment?', a: 'Single sessions are available; most clients choose 6–12 weeks for momentum.' },
      ],
    },
    contact: {
      title: 'Get in touch',
      sub: 'Questions about programs, availability, or speaking? Send a note — I’ll reply within 48 hours.',
      first: 'First name',
      last: 'Last name',
      email: 'Email',
      message: 'Message',
      placeholder: 'How can I help?',
      send: 'Send message',
      policy: 'By sending, you agree to our privacy policy.',
      hours: 'Mon–Fri · 9:00–17:00',
      site: 'lizacoaching.com',
    },
    footer: { privacy: 'Privacy', terms: 'Terms', imprint: 'Imprint', rights: (y: number) => `© ${y} Liza Coaching. All rights reserved.` },
    langLabel: 'Language',
  },

  ru: {
    brand: 'Liza Coaching',
    nav: { services: 'Услуги', about: 'Обо мне', method: 'Метод', results: 'Результаты', contact: 'Контакты', book: 'Записаться на звонок' },
    hero: {
      chip: 'Индивидуальный и групповой коучинг · Бесплатная ознакомительная встреча',
      h1: 'Вера в себя. Поддержка в доверии. Системные действия.',
      sub: 'Помогаю амбициозным преподавателям и помогающим практикам развиваться в своем деле в согласии со своими внутренними ценностями.',
      ctaPrimary: 'Получить предварительную консультацию',
      ctaSecondary: 'Посмотреть программы',
      rating: '4.9/5 у 200+ клиентов',
      ethics: 'Этика в соответствии с ICF',
      cohort: 'Следующий поток',
      cohortDate: '3 Ноября',
    },
    proof: {
      feat: 'Публикации',
      founders: 'Мне доверяют',
      foundersWho: 'предприниматели',
      roi: 'Получи результат',
      weeks: 'за 7-14 недель',
      sessions: 'Проведено сессий',
      sessionsCount: '750+',
      mindful: 'Mindful Weekly',
    },
    services: {
      title: 'Коучинговые предложения',
      sub: 'Гибкие форматы, ориентированные на ваши цели и расписание.',
      cards: [
        { title: 'Индивидуальная глубинная сессия', price: '€149 / сессия', bullets: ['60 минут в Zoom', 'Личный роадмап', 'Поддержка в Voxer 5 дней'], badge: 'Самое популярное' },
        { title: 'Пакет «Импульс»', price: '€799 / 6 недель', bullets: ['Еженедельно по 50 минут', 'Трекер привычек', 'Заметки-подотчётность'] },
        { title: 'День ясности', price: '€950 / день', bullets: ['Полудневный интенсив', 'Карта ценностей и видения', 'План действий на 90 дней'] },
      ],
      choose: 'Выбрать',
    },
    about: {
      title: 'Знакомьтесь, Луна',
      body: 'Сертифицированный коуч, экс-руководитель продукта и вечная студентка изменения поведения. Соединяю коучинг, позитивную психологию и практические системы, чтобы превращать инсайты в действия.',
      bullets: [
        'Обучение по стандартам ICF, 500+ часов коучинга',
        'Инструменты с доказательной базой: CBT, WOOP, Tiny Habits',
        'Травма-осознанно, инклюзивно и конфиденциально',
      ],
      cta1: 'Записаться на вводный звонок',
      cta2: 'Как я работаю',
      stat: 'Клиенты из 12+ стран',
    },
    method: {
      title: 'Методика ОПОРА',
      sub: 'Простой путь, по которому мы пойдём вместе.',
      steps: [
        {
          k: 'О',
          t: 'Определить',
          subtitle: 'Определить, чего вы действительно хотите и зачем.',
          d: 'Мы начинаем с того, что выявляем вашу настоящую цель — не ту, которую "надо", а ту, которая зажигает изнутри. Вы поймёте, к чему действительно стремитесь, и перестанете распыляться.'
        },
        {
          k: 'П',
          t: 'Проверить',
          subtitle: 'Согласовать цели с ценностями и ограничениями.',
          d: 'Проверяем, совпадает ли ваша цель с тем, что для вас по-настоящему важно. Убираем внутренние противоречия, которые тормозят движение. Вы перестанете бояться и начнёте действовать.'
        },
        {
          k: 'О',
          t: 'Организовать',
          subtitle: 'Сделать систему из маленьких простых действий, которые приносят больше всего результата',
          d: 'Создаём простые привычки и действия, которые работают на автомате и ведут к результату без насилия над собой. Вы получите план, который реально работает.'
        },
        {
          k: 'Р',
          t: 'Результат',
          subtitle: 'Регулярность. Отслеживать прогресс, поддерживать по ходу движения, корректировать курс.',
          d: 'Регулярно смотрим на результаты, празднуем успехи и корректируем курс, если нужно. Вы не остаётесь одни — я с вами на каждом шаге.'
        },
        {
          k: 'А',
          t: 'Адаптировать',
          subtitle: 'Гибко менять подход под ваши потребности.',
          d: 'Жизнь меняется, и план тоже может меняться. Мы адаптируем стратегию под новые обстоятельства, сохраняя движение к цели без стресса и перегрузки.'
        },
      ],
    },
    testimonials: { title: 'Результаты клиентов', sub: 'Реальные истории сотрудничества.' },
    booking: {
      title: 'СДВИНУТЬСЯ С МЕРТВОЙ ТОЧКИ',
      sub: 'Запишитесь на бесплатную 20-минутную встречу-знакомство. Обсудим цели и поймём, подходим ли мы друг другу — без обязательств.',
      cta1: 'Оставить заявку',
      cta2: 'Смотреть вопросы',
    },
    faq: {
      title: 'Вопросы и ответы',
      items: [
        { q: 'Какой у вас стиль коучинга?', a: 'Поддерживающий партнёрский коучинг: сильные вопросы + работа с телом, эмоциями и мыслями. Движение к жизни, где работа на себя радует и приносит доход?' },
        { q: 'Проводите ли вы дистанционные сессии?', a: 'Да — все встречи проходят онлайн. Я работаю с клиентами из разных часовых поясов.' },
        { q: 'Какое обязательство по времени?', a: 'Эффект будет даже после одной сессии; для более системного результата при поддержке выбирают 7–14 недель.' },
      ],
    },
    contact: {
      title: 'Свяжитесь со мной',
      sub: 'Есть вопросы о программах, доступности или выступлениях? Напишите — отвечу в течение 48 часов.',
      first: 'Имя',
      last: 'Фамилия',
      email: 'Эл. почта',
      message: 'Сообщение',
      placeholder: 'Чем я могу помочь?',
      send: 'Отправить сообщение',
      policy: 'Отправляя форму, вы соглашаетесь с политикой конфиденциальности.',
      hours: 'Пн–Пт · 9:00–17:00',
      site: 'lizacoaching.com',
    },
    footer: { privacy: 'Конфиденциальность', terms: 'Условия', imprint: 'Реквизиты', rights: (y: number) => `© ${y} Liza Coaching. Все права защищены.` },
    langLabel: 'Язык',
  },
} as const;

export default function LifeCoachLanding() {
  const [lang, setLang] = useState<Lang>('en');

  // On first load, prefer saved choice or browser language
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem('lang')) as Lang | null;
    if (saved === 'en' || saved === 'ru') return setLang(saved);
    const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : '';
    if (nav.startsWith('ru')) setLang('ru');
  }, []);

  // Persist choice
  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', lang);
  }, [lang]);

  const t = useMemo(() => copy[lang], [lang]);

  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--bg)/0.7] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-2xl bg-[var(--brand)] grid place-items-center text-white font-semibold shadow-sm group-hover:shadow group-active:translate-y-px transition">
              LC
            </div>
            <span className="text-lg font-semibold tracking-tight">{t.brand}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-[var(--brand-ink)]">{t.nav.services}</a>
            <a href="#about" className="hover:text-[var(--brand-ink)]">{t.nav.about}</a>
            <a href="#method" className="hover:text-[var(--brand-ink)]">{t.nav.method}</a>
            <a href="#testimonials" className="hover:text-[var(--brand-ink)]">{t.nav.results}</a>
            <a href="#contact" className="hover:text-[var(--brand-ink)]">{t.nav.contact}</a>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-4 py-2 font-medium text-white shadow hover:bg-[var(--brand-hover)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.4]"
            >
              {t.nav.book}
            </a>

            {/* Language dropdown */}
            <div className="relative">
              <label className="sr-only" htmlFor="lang-select">{t.langLabel}</label>
              <select
                id="lang-select"
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-sm hover:bg-[color:var(--surface)/0.95] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.25]"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-clip">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--tint-1)] blur-3xl opacity-60" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--accent)] blur-3xl opacity-60" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--tint-2)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--brand-ink)] mb-5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
              {t.hero.chip}
            </p>
            <h1 className="text-4xl/tight md:text-5xl font-semibold tracking-tight">
              {t.hero.h1}
            </h1>
            <p className="mt-4 text-[var(--muted)] text-lg">{t.hero.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium shadow hover:bg-[var(--brand-hover)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.4]"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--surface)] px-6 py-3 text-[var(--text)] font-medium border border-[var(--border)] hover:border-[var(--border)]/80"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2"><StarIcon className="h-5 w-5 text-[var(--brand-ink)]" />{' '}{t.hero.rating}</div>
              <div className="flex items-center gap-2"><ShieldIcon className="h-5 w-5 text-[var(--brand-ink)]" />{' '}{t.hero.ethics}</div>
            </div>
          </div>
          {/* Right panel: autoplay intro video (centered) */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-tr from-[var(--tint-1)] via-[var(--surface)] to-[var(--accent)] p-2 shadow-xl">
              <div className="relative h-full w-full overflow-hidden rounded-2xl grid place-items-center bg-[var(--surface)]">
                <video
                  className="h-full w-full object-cover object-center"
                  playsInline
                  autoPlay
                  muted
                  loop
                  preload="metadata"
                  poster="/video/2video-poster.webp"
                  aria-label="Intro video from Liza Coaching"
                  onEnded={(e) => {
                    // Fallback to restart video if loop fails
                    e.currentTarget.currentTime = 0;
                    e.currentTarget.play();
                  }}
                  onLoadStart={(e) => {
                    // Optimize for performance - only load what's needed
                    e.currentTarget.volume = 0;
                  }}
                >
                  {/* Mobile-first: smaller video for mobile devices */}
                  <source src="/video/2intro-480p.mp4" type="video/mp4" media="(max-width: 768px)" />
                  {/* Desktop: higher quality */}
                  <source src="/video/2intro-720p.mp4" type="video/mp4" media="(min-width: 769px)" />
                  {/* Fallback WebM for browsers that support it */}
                  <source src="/video/2intro.webm" type="video/webm" />
                  {/* Final fallback MP4 */}
                  <source src="/video/2intro.mp4" type="video/mp4" />
                  <track kind="captions" src="/video/intro-captions.vtt" srcLang="en" label="English captions" default />
                  <track kind="captions" src="/video/intro-captions-ru.vtt" srcLang="ru" label="Русские субтитры" />
                </video>
                {/* Soft info pill */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
                  <div className="mx-auto max-w-sm rounded-xl bg-[color:var(--surface)/0.75] backdrop-blur border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)]">
                    {lang === 'ru' ? '20 сек. интро · без звука · с субтитрами' : '20-sec intro · sound off · captions on'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-8 border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-[var(--muted)]">
          <div>{t.proof.feat} <span className="font-medium text-[var(--text)]">{t.proof.mindful}</span></div>
          <div>{t.proof.founders} <span className="font-medium text-[var(--text)]">{t.proof.foundersWho}</span></div>
          <div>{t.proof.roi} <span className="font-medium text-[var(--text)]">{t.proof.weeks}</span></div>
          <div>{t.proof.sessions} <span className="font-medium text-[var(--text)]">{t.proof.sessionsCount}</span></div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">{t.services.title}</h2>
            <p className="mt-2 text-[var(--muted)]">{t.services.sub}</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {t.services.cards.map((c, i) => (
              <ServiceCard key={i} title={c.title} price={c.price} bullet={c.bullets} badge={'badge' in c ? c.badge : undefined} chooseLabel={t.services.choose} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{t.about.title}</h2>
            <p className="mt-4 text-[var(--muted)]">{t.about.body}</p>
            <ul className="mt-6 space-y-3 text-[var(--muted)]">
              {t.about.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-5 w-5 text-[var(--brand-ink)]" />{b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <a href="#booking" className="inline-flex items-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium shadow hover:bg-[var(--brand-hover)]">{t.about.cta1}</a>
              <a href="#method" className="inline-flex items-center rounded-xl border px-6 py-3 font-medium border-[var(--border)] bg-[var(--surface)] hover:bg-[color:var(--surface)/0.9]">{t.about.cta2}</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-[var(--tint-1)] p-2 shadow-xl">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/img/luna.webp"
                  alt={lang === 'ru' ? 'Лиза, лайф-коуч' : 'Liza, life coach'}
                  fill
                  className="object-cover object-center"
                  priority={false}
                  sizes="(min-width: 1024px) 32rem, (min-width: 768px) 50vw, 100vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-[color:var(--surface)/0.9] backdrop-blur rounded-2xl shadow-md border border-[var(--border)] px-4 py-3">
              <p className="text-sm"><strong>{t.about.stat}</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section id="method" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">{t.method.title}</h2>
            <p className="mt-2 text-[var(--muted)]">{t.method.sub}</p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.method.steps.map((s, i) => (
              <MethodStepCard key={i} k={s.k} t={s.t} subtitle={s.subtitle} d={s.d} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-24 bg-gradient-to-b from-[var(--surface)] to-[color:var(--tint-1)/0.4] border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">{t.testimonials.title}</h2>
            <p className="mt-2 text-[var(--muted)]">{t.testimonials.sub}</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <TestimonialCard quote="I landed the role I was dreaming of and finally built a routine I can stick to." name="Sara P." role="Product Manager" />
            <TestimonialCard quote="Weekly sessions kept me accountable — I shipped my app in 6 weeks." name="Jonas K." role="Founder" />
            <TestimonialCard quote="I stopped second-guessing and started executing with ease." name="Anya R." role="Designer" />
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{t.booking.title}</h2>
          <p className="mt-3 text-[var(--muted)] max-w-2xl mx-auto">{t.booking.sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="inline-flex items-center rounded-xl bg-[var(--brand)] px-6 py-3 text-white font-medium shadow hover:bg-[var(--brand-hover)]">{t.booking.cta1}</a>
            <a href="#faq" className="inline-flex items-center rounded-xl border px-6 py-3 font-medium border-[var(--border)] bg-[var(--surface)] hover:bg-[color:var(--surface)/0.95]">{t.booking.cta2}</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-center">{t.faq.title}</h2>
          <dl className="mt-10 space-y-6">
            {t.faq.items.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{t.contact.title}</h2>
            <p className="mt-3 text-[var(--muted)]">{t.contact.sub}</p>
            <div className="mt-6 space-y-3 text-[var(--muted)]">
              <div className="flex items-center gap-3"><MailIcon className="h-5 w-5 text-[var(--brand-ink)]" /> hello@lizacoaching.com</div>
              <div className="flex items-center gap-3"><GlobeIcon className="h-5 w-5 text-[var(--brand-ink)]" /> {t.contact.site}</div>
              <div className="flex items-center gap-3"><CalendarIcon className="h-5 w-5 text-[var(--brand-ink)]" /> {t.contact.hours}</div>
            </div>
          </div>
          <form className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t.contact.first}</label>
                <input className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3]" placeholder={lang === 'ru' ? 'Анна' : 'Jane'} />
              </div>
              <div>
                <label className="text-sm font-medium">{t.contact.last}</label>
                <input className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3]" placeholder={lang === 'ru' ? 'Иванова' : 'Doe'} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">{t.contact.email}</label>
                <input type="email" className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3]" placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">{t.contact.message}</label>
                <textarea rows={4} className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3]" placeholder={t.contact.placeholder} />
              </div>
            </div>
            <button type="button" className="mt-4 inline-flex items-center rounded-xl bg-[var(--brand)] px-5 py-2.5 text-white font-medium hover:bg-[var(--brand-hover)]">{t.contact.send}</button>
            <p className="mt-3 text-xs text-[var(--muted)]">{t.contact.policy}</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
          <p>{copy[lang].footer.rights(new Date().getFullYear())}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[var(--text)]">{t.footer.privacy}</a>
            <a href="#" className="hover:text-[var(--text)]">{t.footer.terms}</a>
            <a href="#" className="hover:text-[var(--text)]">{t.footer.imprint}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== Reusable Cards ===== */

function ServiceCard({
  title, price, bullet, badge, chooseLabel = 'Choose',
}: { title: string; price: string; bullet: readonly string[]; badge?: string; chooseLabel?: string }) {
  return (
    <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      {badge && (
        <span className="absolute -top-3 left-4 rounded-full bg-[color:var(--tint-1)/0.6] text-[var(--brand-ink)] text-xs font-medium px-2.5 py-1 border border-[var(--tint-2)]">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-[var(--muted)]">{price}</p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
        {bullet.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 h-4 w-4 text-[var(--brand-ink)]" />{b}
          </li>
        ))}
      </ul>
      <a href="#booking" className="mt-5 inline-flex items-center rounded-xl bg-[var(--text)] px-4 py-2 text-white font-medium hover:bg-[color:var(--text)/0.9]">
        {chooseLabel}
      </a>
    </div>
  );
}

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="flex gap-2 text-[var(--brand-ink)]">
        <QuoteIcon className="h-5 w-5" /><QuoteIcon className="h-5 w-5 -scale-x-100" />
      </div>
      <blockquote className="mt-3 text-[var(--text)]">“{quote}”</blockquote>
      <figcaption className="mt-4 text-sm text-[var(--muted)]">{name} · {role}</figcaption>
    </figure>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="font-medium">{q}</div>
      <p className="mt-2 text-[var(--muted)] text-sm">{a}</p>
    </div>
  );
}

/* --- Minimal inline icons (no external deps) --- */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="m5 13 4 4L19 7" /></svg>
  )
}
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
  )
}
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2 4 5v6c0 5 3.4 9.74 8 11 4.6-1.26 8-6 8-11V5l-8-3z" /></svg>
  )
}
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></svg>
  )
}
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" /></svg>
  )
}
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  )
}
function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M7 7h5v5H9v5H4v-5h3V7zm10 0h5v5h-3v5h-5v-5h3V7z" /></svg>
  )
}
