'use client';

import { useEffect, useState } from 'react';
import { Lang, translations } from '@/lib/i18n';
import { detectUserLanguage, saveLanguagePreference } from '@/lib/languageDetection';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const policyContent = {
    en: {
        title: 'Cookie Policy',
        lastUpdated: 'Last Updated: November 21, 2025',
        intro: 'This Cookie Policy explains how Liza Coaching ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at liza.coach ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.',
        sections: [
            {
                heading: '1. What are cookies?',
                content: 'Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.',
            },
            {
                heading: '2. Why do we use cookies?',
                content: 'We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.',
            },
            {
                heading: '3. Types of Cookies We Use',
                content: '• **Essential Cookies:** These are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.\n\n• **Analytics and Customization Cookies:** These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.\n\n• **Advertising Cookies:** These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.',
            },
            {
                heading: '4. How can I control cookies?',
                content: 'You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. In addition, most web browsers allow you to control cookies through their settings preferences. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.',
            },
            {
                heading: '5. Updates to this Policy',
                content: 'We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.',
            },
            {
                heading: '6. Contact Us',
                content: 'If you have any questions about our use of cookies or other technologies, please email us at hello@liza.coach or contact us via Telegram @lizadirect.',
            },
        ],
    },
    ru: {
        title: 'Политика использования файлов Cookie',
        lastUpdated: 'Последнее обновление: 21 ноября 2025 г.',
        intro: 'Эта Политика использования файлов cookie объясняет, как Liza Coaching («мы», «нас» или «наш») использует файлы cookie и аналогичные технологии для распознавания вас при посещении нашего веб-сайта liza.coach («Веб-сайт»). В ней объясняется, что это за технологии и почему мы их используем, а также ваши права контролировать их использование нами.',
        sections: [
            {
                heading: '1. Что такое файлы cookie?',
                content: 'Файлы cookie — это небольшие файлы данных, которые размещаются на вашем компьютере или мобильном устройстве при посещении веб-сайта. Владельцы веб-сайтов широко используют файлы cookie для обеспечения работы своих веб-сайтов или повышения их эффективности, а также для предоставления отчетной информации.',
            },
            {
                heading: '2. Почему мы используем файлы cookie?',
                content: 'Мы используем собственные и сторонние файлы cookie по нескольким причинам. Некоторые файлы cookie необходимы по техническим причинам для работы нашего Веб-сайта, и мы называем их «обязательными» или «строго необходимыми» файлами cookie. Другие файлы cookie также позволяют нам отслеживать и таргетировать интересы наших пользователей для улучшения опыта использования наших Онлайн-ресурсов. Третьи стороны размещают файлы cookie через наш Веб-сайт в рекламных, аналитических и других целях.',
            },
            {
                heading: '3. Типы используемых нами файлов cookie',
                content: '• **Обязательные файлы cookie:** Они строго необходимы для предоставления вам услуг, доступных через наш Веб-сайт, и для использования некоторых его функций, таких как доступ к защищенным областям.\n\n• **Аналитические и функциональные файлы cookie:** Эти файлы cookie собирают информацию, которая используется либо в агрегированной форме, чтобы помочь нам понять, как используется наш Веб-сайт или насколько эффективны наши маркетинговые кампании, либо чтобы помочь нам настроить наш Веб-сайт для вас.\n\n• **Рекламные файлы cookie:** Эти файлы cookie используются для того, чтобы рекламные сообщения были более релевантными для вас. Они выполняют такие функции, как предотвращение постоянного повторного появления одного и того же объявления, обеспечение правильного отображения рекламы для рекламодателей и, в некоторых случаях, выбор рекламы на основе ваших интересов.',
            },
            {
                heading: '4. Как я могу управлять файлами cookie?',
                content: 'Вы имеете право принять или отклонить файлы cookie. Вы можете реализовать свои права на использование файлов cookie, настроив свои предпочтения в Менеджере согласия на использование файлов cookie. Кроме того, большинство веб-браузеров позволяют управлять файлами cookie через настройки. Если вы решите отклонить файлы cookie, вы все равно сможете использовать наш веб-сайт, хотя ваш доступ к некоторым функциям и областям нашего веб-сайта может быть ограничен.',
            },
            {
                heading: '5. Обновления этой Политики',
                content: 'Мы можем время от времени обновлять эту Политику использования файлов cookie, чтобы отражать, например, изменения в используемых нами файлах cookie или по другим операционным, юридическим или нормативным причинам. Поэтому, пожалуйста, регулярно посещайте эту Политику использования файлов cookie, чтобы быть в курсе использования нами файлов cookie и связанных с ними технологий.',
            },
            {
                heading: '6. Свяжитесь с нами',
                content: 'Если у вас есть какие-либо вопросы о нашем использовании файлов cookie или других технологий, напишите нам по адресу hello@liza.coach или свяжитесь с нами через Telegram @lizadirect.',
            },
        ],
    },
};

export default function CookiePolicy() {
    const [lang, setLang] = useState<Lang>('en');

    useEffect(() => {
        const detectedLang = detectUserLanguage();
        setLang(detectedLang);
    }, []);

    const handleLangChange = (newLang: Lang) => {
        setLang(newLang);
        saveLanguagePreference(newLang);
    };

    const t = translations[lang];
    const content = policyContent[lang];

    return (
        <div className="min-h-screen bg-[var(--bg)] flex flex-col">
            <Header t={t} lang={lang} onLangChange={handleLangChange} />

            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 md:p-12 shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-ink)] mb-4 font-serif">
                        {content.title}
                    </h1>
                    <p className="text-sm text-[var(--muted)] mb-8">
                        {content.lastUpdated}
                    </p>

                    <div className="prose prose-stone max-w-none text-[var(--text)]">
                        <p className="text-lg leading-relaxed mb-8">
                            {content.intro}
                        </p>

                        <div className="space-y-8">
                            {content.sections.map((section, index) => (
                                <section key={index}>
                                    <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-3 font-serif">
                                        {section.heading}
                                    </h2>
                                    <div className="whitespace-pre-line leading-relaxed text-[var(--muted)]">
                                        {section.content}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer t={t} />
        </div>
    );
}
