export type Lang = 'en' | 'ru';

export const translations = {
  en: {
    brand: 'Liza Coaching',
    nav: { 
      services: 'Services', 
      about: 'About', 
      method: 'Method', 
      results: 'Results', 
      contact: 'Contact', 
      book: 'Book a Call' 
    },
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
        { 
          title: '1:1 Deep-Dive', 
          price: '€149 / session', 
          bullets: ['60-min on Zoom','Personal roadmap','Voxer support 5 days'], 
          badge: 'Most popular' 
        },
        { 
          title: 'Momentum Pack', 
          price: '€799 / 6 weeks', 
          bullets: ['Weekly 50-min','Habit tracker','Accountability notes'] 
        },
        { 
          title: 'Clarity Day', 
          price: '€950 / day', 
          bullets: ['Half-day intensive','Values & vision map','90-day action plan'] 
        },
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
      imageAlt: 'Liza, life coach',
    },
    method: {
      title: 'The CALM Framework',
      sub: "A simple path we'll follow together.",
      steps: [
        { k: 'C', t: 'Clarify', d: 'Define what you really want and why it matters.' },
        { k: 'A', t: 'Align', d: 'Map goals to values and constraints.' },
        { k: 'L', t: 'Leverage', d: 'Design tiny, repeatable systems that compound.' },
        { k: 'M', t: 'Measure', d: 'Track progress, review, and adjust with support.' },
      ],
    },
    testimonials: { 
      title: 'Client results', 
      sub: 'Real stories from coaching engagements.' 
    },
    booking: {
      title: 'Ready to get unstuck?',
      sub: "Book a free 20-minute discovery call. We'll explore your goals and see if it's a fit. No pressure.",
      cta1: 'Request a call',
      cta2: 'See FAQs',
    },
    faq: {
      title: 'FAQs',
      items: [
        { 
          q: "What's your coaching style?", 
          a: "Supportive yet direct. I'll ask powerful questions, reflect patterns, and co-design simple experiments that move you forward." 
        },
        { 
          q: 'Do you offer remote sessions?', 
          a: 'Yes — all sessions are online. I coach clients across time zones.' 
        },
        { 
          q: "What's the commitment?", 
          a: 'Single sessions are available; most clients choose 6–12 weeks for momentum.' 
        },
      ],
    },
    contact: {
      title: 'Get in touch',
      sub: "Questions about programs, availability, or speaking? Send a note — I'll reply within 48 hours.",
      first: 'First name',
      last: 'Last name',
      email: 'Email',
      message: 'Message',
      placeholder: 'How can I help?',
      send: 'Send message',
      policy: 'By sending, you agree to our privacy policy.',
      hours: 'Mon–Fri · 9:00–17:00',
      site: 'lizacoaching.com',
      emailAddress: 'hello@lizacoaching.com',
    },
    footer: { 
      privacy: 'Privacy', 
      terms: 'Terms', 
      imprint: 'Imprint', 
      rights: (y: number) => `© ${y} Liza Coaching. All rights reserved.` 
    },
    langLabel: 'Language',
    videoInfo: '20-sec intro · sound off · captions on',
    videoAriaLabel: 'Intro video from Liza Coaching',
    cohortStarts: 'starts',
  },

  ru: {
    brand: 'Liza Coaching',
    nav: { 
      services: 'Услуги', 
      about: 'Обо мне', 
      method: 'Метод', 
      results: 'Результаты', 
      contact: 'Контакты', 
      book: 'Записаться на звонок' 
    },
    hero: {
      chip: 'Индивидуальный и групповой коучинг · Бесплатная ознакомительная встреча',
      h1: 'Ясность. Уверенность. Системные действия.',
      sub: 'Помогаю амбициозным людям выйти из застоя, поставить согласованные цели и выстроить привычки — без выгорания.',
      ctaPrimary: 'Записаться на бесплатный звонок',
      ctaSecondary: 'Посмотреть программы',
      rating: '4.9/5 у 120+ клиентов',
      ethics: 'Этика в соответствии с ICF',
      cohort: 'Следующий поток',
      cohortDate: '3 ноя',
    },
    proof: {
      feat: 'Публикации',
      founders: 'Нам доверяют',
      foundersWho: 'основатели стартапов',
      roi: 'Средний результат',
      weeks: '6–12 недель',
      sessions: 'Проведено сессий',
      sessionsCount: '2k+',
      mindful: 'Mindful Weekly',
    },
    services: {
      title: 'Коучинговые предложения',
      sub: 'Гибкие форматы, ориентированные на ваши цели и расписание.',
      cards: [
        { 
          title: 'Индивидуальная глубинная сессия', 
          price: '€149 / сессия', 
          bullets: ['60 минут в Zoom','Личный роадмап','Поддержка в Voxer 5 дней'], 
          badge: 'Самое популярное' 
        },
        { 
          title: 'Пакет «Импульс»', 
          price: '€799 / 6 недель', 
          bullets: ['Еженедельно по 50 минут','Трекер привычек','Заметки-подотчётность'] 
        },
        { 
          title: 'День ясности', 
          price: '€950 / день', 
          bullets: ['Полудневный интенсив','Карта ценностей и видения','План действий на 90 дней'] 
        },
      ],
      choose: 'Выбрать',
    },
    about: {
      title: 'Знакомьтесь, Лиза',
      body: 'Сертифицированный коуч, экс-руководитель продукта и вечная студентка изменения поведения. Соединяю коучинг, позитивную психологию и практические системы, чтобы превращать инсайты в действия.',
      bullets: [
        'Обучение по стандартам ICF, 500+ часов коучинга',
        'Инструменты с доказательной базой: CBT, WOOP, Tiny Habits',
        'Травма-осознанно, инклюзивно и конфиденциально',
      ],
      cta1: 'Записаться на вводный звонок',
      cta2: 'Как я работаю',
      stat: 'Клиенты из 12+ стран',
      imageAlt: 'Лиза, лайф-коуч',
    },
    method: {
      title: 'Методика CALM',
      sub: 'Простой путь, по которому мы пойдём вместе.',
      steps: [
        { k: 'C', t: 'Clarify', d: 'Определить, чего вы действительно хотите и зачем.' },
        { k: 'A', t: 'Align', d: 'Согласовать цели с ценностями и ограничениями.' },
        { k: 'L', t: 'Leverage', d: 'Спроектировать маленькие повторяемые системы, которые накапливают эффект.' },
        { k: 'M', t: 'Measure', d: 'Отслеживать прогресс, делать обзоры и корректировки с поддержкой.' },
      ],
    },
    testimonials: { 
      title: 'Результаты клиентов', 
      sub: 'Реальные истории сотрудничества.' 
    },
    booking: {
      title: 'Готовы выбраться из застоя?',
      sub: 'Запишитесь на бесплатную 20-минутную встречу-знакомство. Обсудим цели и поймём, подходим ли мы друг другу — без обязательств.',
      cta1: 'Оставить заявку',
      cta2: 'Смотреть вопросы',
    },
    faq: {
      title: 'Вопросы и ответы',
      items: [
        { 
          q: 'Какой у вас стиль коучинга?', 
          a: 'Поддерживающий, но прямой. Я задаю сильные вопросы, отражаю паттерны и вместе с вами проектирую простые эксперименты, которые двигают вперёд.' 
        },
        { 
          q: 'Проводите ли вы дистанционные сессии?', 
          a: 'Да — все встречи проходят онлайн. Я работаю с клиентами из разных часовых поясов.' 
        },
        { 
          q: 'Какое обязательство по времени?', 
          a: 'Можно разово; чаще всего выбирают 6–12 недель для набора импульса.' 
        },
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
      emailAddress: 'hello@lizacoaching.com',
    },
    footer: { 
      privacy: 'Конфиденциальность', 
      terms: 'Условия', 
      imprint: 'Реквизиты', 
      rights: (y: number) => `© ${y} Liza Coaching. Все права защищены.` 
    },
    langLabel: 'Язык',
    videoInfo: '20 сек. интро · без звука · с субтитрами',
    videoAriaLabel: 'Интро видео от Liza Coaching',
    cohortStarts: 'стартует',
  },
} as const;

export type Translations = typeof translations[Lang];
