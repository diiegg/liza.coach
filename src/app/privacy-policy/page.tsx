'use client';

import { useEffect, useState } from 'react';
import { Lang, translations } from '@/lib/i18n';
import { detectUserLanguage, saveLanguagePreference } from '@/lib/languageDetection';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

const policyContent = {
    en: {
        title: 'Privacy Policy',
        lastUpdated: 'Last Updated: November 21, 2025',
        intro: 'At Liza Coaching ("we", "us", or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website liza.coach (the "Site").',
        sections: [
            {
                heading: '1. Information We Collect',
                content: 'We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Site, or otherwise when you contact us.\n\nPersonal Data: Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.',
            },
            {
                heading: '2. Use of Your Information',
                content: 'We use the information we collect or receive:\n• To send you administrative information.\n• To fulfill and manage your orders.\n• To deliver targeted advertising to you.\n• To request feedback and contact you about your use of the Site.\n• To resolve disputes and troubleshoot problems.',
            },
            {
                heading: '3. Cookies and Tracking Technologies',
                content: 'We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.',
            },
            {
                heading: '4. GDPR Data Protection Rights',
                content: 'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:\n• The right to access – You have the right to request copies of your personal data.\n• The right to rectification – You have the right to request that we correct any information you believe is inaccurate.\n• The right to erasure – You have the right to request that we erase your personal data, under certain conditions.\n• The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.\n• The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.',
            },
            {
                heading: '5. International Transfers',
                content: 'Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.',
            },
            {
                heading: '6. Contact Us',
                content: 'If you have any questions about this Privacy Policy, please contact us via email at hello@liza.coach or via Telegram @lizadirect.',
            },
        ],
    },
    ru: {
        title: 'Политика конфиденциальности',
        lastUpdated: 'Последнее обновление: 21 ноября 2025 г.',
        intro: 'Мы в Liza Coaching («мы», «нас» или «наш») стремимся защищать вашу конфиденциальность и обеспечивать безопасность вашей личной информации. В этой Политике конфиденциальности объясняется, как мы собираем, используем, раскрываем и защищаем вашу информацию, когда вы посещаете наш веб-сайт liza.coach («Сайт»).',
        sections: [
            {
                heading: '1. Сбор информации',
                content: 'Мы можем собирать личную информацию, которую вы добровольно предоставляете нам, когда выражаете интерес к получению информации о нас или наших продуктах и услугах, когда участвуете в деятельности на Сайте или иным образом связываетесь с нами.\n\nПерсональные данные: Личная информация, такая как ваше имя, адрес электронной почты и номер телефона, которую вы добровольно предоставляете нам при регистрации на Сайте или при участии в различных мероприятиях, связанных с Сайтом.',
            },
            {
                heading: '2. Использование вашей информации',
                content: 'Мы используем информацию, которую собираем или получаем:\n• Для отправки вам административной информации.\n• Для выполнения и управления вашими заказами.\n• Для показа вам таргетированной рекламы.\n• Для запроса отзывов и связи с вами по поводу использования вами Сайта.\n• Для разрешения споров и устранения проблем.',
            },
            {
                heading: '3. Файлы Cookie и технологии отслеживания',
                content: 'Мы используем файлы cookie и аналогичные технологии отслеживания (например, веб-маяки и пиксели) для доступа к информации или ее хранения. Подробная информация о том, как мы используем такие технологии и как вы можете отказаться от определенных файлов cookie, изложена в нашем Уведомлении о файлах cookie.',
            },
            {
                heading: '4. Ваши права (GDPR и 152-ФЗ)',
                content: 'Мы хотим убедиться, что вы полностью осведомлены о всех своих правах на защиту данных. Каждый пользователь имеет право на следующее:\n• Право на доступ – Вы имеете право запрашивать копии своих персональных данных.\n• Право на исправление – Вы имеете право требовать, чтобы мы исправили любую информацию, которую вы считаете неточной.\n• Право на удаление – Вы имеете право требовать, чтобы мы удалили ваши персональные данные при определенных условиях.\n• Право на ограничение обработки – Вы имеете право требовать, чтобы мы ограничили обработку ваших персональных данных при определенных условиях.',
            },
            {
                heading: '5. Международная передача данных',
                content: 'Ваша информация, включая Персональные данные, может передаваться на компьютеры, расположенные за пределами вашего штата, провинции, страны или другой государственной юрисдикции, где законы о защите данных могут отличаться от законов вашей юрисдикции.',
            },
            {
                heading: '6. Свяжитесь с нами',
                content: 'Если у вас есть какие-либо вопросы об этой Политике конфиденциальности, свяжитесь с нами по электронной почте hello@liza.coach или через Telegram @lizadirect.',
            },
        ],
    },
};

export default function PrivacyPolicy() {
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
