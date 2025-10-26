'use client';

import { useState, FormEvent } from 'react';
import { Lang, Translations } from '@/lib/i18n';
import { MailIcon, GlobeIcon, CalendarIcon } from '../icons';

interface ContactProps {
  t: Translations;
  lang: Lang;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact({ t, lang }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = lang === 'ru' ? 'Обязательное поле' : 'Required field';
    }

    if (!formData.email.trim()) {
      newErrors.email = lang === 'ru' ? 'Обязательное поле' : 'Required field';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = lang === 'ru' ? 'Неверный формат email' : 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = lang === 'ru' ? 'Обязательное поле' : 'Required field';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = lang === 'ru' ? 'Минимум 10 символов' : 'Minimum 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{t.contact.title}</h2>
          <p className="mt-3 text-[var(--muted)]">{t.contact.sub}</p>
          <div className="mt-6 space-y-3 text-[var(--muted)]">
            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-[var(--brand-ink)] flex-shrink-0" />
              <a 
                href={`mailto:${t.contact.emailAddress}`}
                className="hover:text-[var(--brand-ink)] transition-colors"
              >
                {t.contact.emailAddress}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <GlobeIcon className="h-5 w-5 text-[var(--brand-ink)] flex-shrink-0" />
              {t.contact.site}
            </div>
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-[var(--brand-ink)] flex-shrink-0" />
              {t.contact.hours}
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm" noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium block">
                {lang === 'ru' ? 'Полное имя' : 'Full Name'} <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`mt-1 w-full rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-[var(--border)]'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3] transition-shadow`}
                placeholder={lang === 'ru' ? 'Анна Иванова' : 'Jane Doe'}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium block">
                {t.contact.email} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`mt-1 w-full rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-[var(--border)]'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3] transition-shadow`}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium block">
                {t.contact.message} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className={`mt-1 w-full rounded-lg border ${
                  errors.message ? 'border-red-500' : 'border-[var(--border)]'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)/0.3] transition-shadow`}
                placeholder={t.contact.placeholder}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 inline-flex items-center rounded-xl bg-[var(--brand)] px-5 py-2.5 text-white font-medium hover:bg-[var(--brand-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {lang === 'ru' ? 'Отправка...' : 'Sending...'}
              </>
            ) : (
              t.contact.send
            )}
          </button>
          
          {submitStatus === 'success' && (
            <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200" role="status">
              <p className="text-sm text-green-800">
                {lang === 'ru' 
                  ? '✓ Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
                  : '✓ Message sent successfully! We\'ll get back to you soon.'}
              </p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200" role="alert">
              <p className="text-sm text-red-800">
                {lang === 'ru' 
                  ? '✗ Произошла ошибка. Пожалуйста, попробуйте еще раз.'
                  : '✗ An error occurred. Please try again.'}
              </p>
            </div>
          )}
          
          <p className="mt-3 text-xs text-[var(--muted)]">{t.contact.policy}</p>
        </form>
      </div>
    </section>
  );
}
