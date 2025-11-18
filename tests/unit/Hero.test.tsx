import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';
import { translations } from '@/lib/i18n';

describe('Hero Component', () => {
  it('renders hero section with correct content', () => {
    render(<Hero t={translations.ru} lang="ru" />);
    
    expect(screen.getByText(translations.ru.hero.h1)).toBeInTheDocument();
    expect(screen.getByText(translations.ru.hero.sub)).toBeInTheDocument();
    expect(screen.getByText(translations.ru.hero.chip)).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<Hero t={translations.ru} lang="ru" />);
    
    const primaryCTA = screen.getByText(translations.ru.hero.ctaPrimary);
    expect(primaryCTA).toBeInTheDocument();
    expect(primaryCTA.closest('a')).toHaveAttribute('href', 'https://calendly.com/meitol0407/30min?month=2025-10');
  });

  it('displays rating and ethics information', () => {
    render(<Hero t={translations.ru} lang="ru" />);
    
    expect(screen.getByText(translations.ru.hero.rating)).toBeInTheDocument();
    expect(screen.getByText(translations.ru.hero.ethics)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Hero t={translations.ru} lang="ru" />);
    
    const video = screen.getByLabelText(translations.ru.videoAriaLabel);
    expect(video).toBeInTheDocument();
  });
});
