import { render, screen, fireEvent } from '@testing-library/react';
import { LayoutToast } from './LayoutToast';

describe('LayoutToast component', () => {
  const defaultProps = {
    bg: 'info' as const,
    title: 'Test Title',
    text: 'This is a toast message.',
    show: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and text when show=true', () => {
    render(<LayoutToast {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is a toast message.')).toBeInTheDocument();
    const toast = screen.getByRole('status');
    expect(toast).toBeInTheDocument();
  });

  it('does not render content when show=false', () => {
    render(<LayoutToast {...defaultProps} show={false} />);
    expect(screen.queryByText('Test Title')).toBeNull();
    expect(screen.queryByText('This is a toast message.')).toBeNull();
  });

  it('calls onClose when close button is clicked', () => {
    render(<LayoutToast {...defaultProps} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});