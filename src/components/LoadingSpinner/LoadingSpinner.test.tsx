import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner component', () => {
  it('renders a spinner with role="status" and accepts a custom className', () => {
    render(<LoadingSpinner className="custom-spinner" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('custom-spinner');
  });

  it('includes a visually-hidden "Loading..." label for screen readers', () => {
    render(<LoadingSpinner />);
    const label = screen.getByText('Loading...');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('visually-hidden');
  });
});