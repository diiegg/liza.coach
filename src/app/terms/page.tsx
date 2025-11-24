'use client';

import { useEffect, useState } from 'react';
import { Lang, translations } from '@/lib/i18n';
import { detectUserLanguage, saveLanguagePreference } from '@/lib/languageDetection';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const termsContent = {
    en: {
        title: 'Terms of Service',
        lastUpdated: 'Last Updated: November 21, 2025',
        intro: 'Welcome to Liza Coaching. By accessing or using our website liza.coach (the "Site") and our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site or services.',
        sections: [
            {
                heading: '1. Acceptance of Terms',
                content: 'By accessing this Site, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.',
            },
            {
                heading: '2. Intellectual Property Rights',
                content: 'The content on the Site, including without limitation the text, software, scripts, graphics, photos, sounds, music, videos, interactive features and the like ("Content") and the trademarks, service marks and logos contained therein ("Marks"), are owned by or licensed to Liza Coaching, subject to copyright and other intellectual property rights under international conventions.',
            },
            {
                heading: '3. User Representations',
                content: 'By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.',
            },
            {
                heading: '4. Disclaimer',
                content: 'The materials on the Site are provided on an "as is" basis. Liza Coaching makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
            },
            {
                heading: '5. Limitation of Liability',
                content: 'In no event shall Liza Coaching or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site, even if Liza Coaching or a Liza Coaching authorized representative has been notified orally or in writing of the possibility of such damage.',
            },
            {
                heading: '6. Governing Law',
                content: 'These Terms shall be governed by and defined following the laws of the jurisdiction in which Liza Coaching is established. Liza Coaching and yourself irrevocably consent that the courts of that jurisdiction shall have exclusive competence to resolve any dispute which may arise in connection with these terms.',
            },
            {
                heading: '7. Contact Us',
                content: 'If you have any questions about these Terms, please contact us via email at hello@liza.coach or via Telegram @lizadirect.',
            },
        ],
    },
    ru: {
        title: 'Условия использования',
        lastUpdated: 'Последнее обновление: 21 ноября 2025 г.',
        intro: 'Добро пожаловать в Liza Coaching. Получая доступ к нашему веб-сайту liza.coach («Сайт») и нашим услугам или используя их, вы соглашаетесь соблюдать настоящие Условия использования («Условия»). Если вы не согласны с этими Условиями, пожалуйста, не используйте наш Сайт или услуги.',
        sections: [
            {
                heading: '1. Принятие условий',
                content: 'Получая доступ к этому Сайту, вы соглашаетесь соблюдать настоящие Условия использования, все применимые законы и правила, а также соглашаетесь с тем, что вы несете ответственность за соблюдение любых применимых местных законов.',
            },
            {
                heading: '2. Права интеллектуальной собственности',
                content: 'Контент на Сайте, включая, помимо прочего, текст, программное обеспечение, скрипты, графику, фотографии, звуки, музыку, видео, интерактивные функции и тому подобное («Контент»), а также товарные знаки, знаки обслуживания и логотипы, содержащиеся в нем («Знаки»), принадлежат или лицензированы Liza Coaching и подпадают под действие авторского права и других прав интеллектуальной собственности в соответствии с международными конвенциями.',
            },
            {
                heading: '3. Заявления пользователя',
                content: 'Используя Сайт, вы заявляете и гарантируете, что: (1) вся регистрационная информация, которую вы предоставляете, будет правдивой, точной, актуальной и полной; (2) вы будете поддерживать точность такой информации и своевременно обновлять такую регистрационную информацию по мере необходимости; (3) вы обладаете дееспособностью и соглашаетесь соблюдать настоящие Условия использования.',
            },
            {
                heading: '4. Отказ от ответственности',
                content: 'Материалы на Сайте предоставляются на условиях «как есть». Liza Coaching не дает никаких гарантий, явных или подразумеваемых, и настоящим отказывается от всех других гарантий и отрицает их, включая, помимо прочего, подразумеваемые гарантии или условия товарной пригодности, пригодности для определенной цели или ненарушения прав интеллектуальной собственности или иного нарушения прав.',
            },
            {
                heading: '5. Ограничение ответственности',
                content: 'Ни при каких обстоятельствах Liza Coaching или ее поставщики не несут ответственности за какой-либо ущерб (включая, помимо прочего, ущерб от потери данных или прибыли, или из-за прерывания деятельности), возникающий в результате использования или невозможности использования материалов на Сайте, даже если Liza Coaching или уполномоченный представитель Liza Coaching были уведомлены устно или письменно о возможности такого ущерба.',
            },
            {
                heading: '6. Применимое право',
                content: 'Настоящие Условия регулируются и толкуются в соответствии с законодательством юрисдикции, в которой учреждена компания Liza Coaching. Liza Coaching и вы безоговорочно соглашаетесь с тем, что суды этой юрисдикции обладают исключительной компетенцией для разрешения любых споров, которые могут возникнуть в связи с настоящими условиями.',
            },
            {
                heading: '7. Свяжитесь с нами',
                content: 'Если у вас есть какие-либо вопросы об этих Условиях, свяжитесь с нами по электронной почте hello@liza.coach или через Telegram @lizadirect.',
            },
        ],
    },
};

export default function TermsOfService() {
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
    const content = termsContent[lang];

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
