import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MethodStepCard } from '@/components/ui/MethodStepCard';

describe('MethodStepCard', () => {
  const props = {
    k: 'O',
    t: 'Test Title',
    subtitle: 'Test Subtitle',
    d: 'Test Description Content',
  };

  it('renders initial state correctly', () => {
    render(<MethodStepCard {...props} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.queryByText('Test Description Content')).not.toBeInTheDocument();
  });

  it('shows description when expanded', async () => {
    render(<MethodStepCard {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(await screen.findByText('Test Description Content')).toBeInTheDocument();
  });

  it('hides description when collapsed', async () => {
    render(<MethodStepCard {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button); // Expand
    expect(await screen.findByText('Test Description Content')).toBeInTheDocument();

    fireEvent.click(button); // Collapse
    await waitFor(() => {
      expect(screen.queryByText('Test Description Content')).not.toBeInTheDocument();
    });
  });
});
