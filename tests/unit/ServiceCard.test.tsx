import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceCard } from '@/components/ui/ServiceCard';

describe('ServiceCard Component', () => {
  const mockProps = {
    title: 'Диагностическая сессия',
    price: '5 000₽',
    duration: 'Длительность: 60 минут',
    bullets: ['Глубокий разбор текущей ситуации', 'Определение точки входа'],
    chooseLabel: 'Записаться',
  };

  it('renders service card with all information', () => {
    render(<ServiceCard {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
    expect(screen.getByText(mockProps.duration!)).toBeInTheDocument();
  });

  it('renders all bullet points', () => {
    render(<ServiceCard {...mockProps} />);
    
    mockProps.bullets.forEach(bullet => {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    });
  });

  it('renders badge when provided', () => {
    render(<ServiceCard {...mockProps} badge="Самое популярное" />);
    
    expect(screen.getByText('Самое популярное')).toBeInTheDocument();
  });

  it('has correct button link and styling', () => {
    render(<ServiceCard {...mockProps} />);
    
    const button = screen.getByText(mockProps.chooseLabel);
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', 'https://calendly.com/meitol0407/30min?month=2025-10');
    expect(button.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('uses flexbox for proper alignment', () => {
    const { container } = render(<ServiceCard {...mockProps} />);
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('flex', 'flex-col', 'h-full');
  });
});
