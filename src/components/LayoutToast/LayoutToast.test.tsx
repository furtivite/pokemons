import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LayoutToast } from './LayoutToast';

describe('LayoutToast component', () => {
  const props = {
    bg: 'success' as const,
    title: 'Test Title',
    text: 'Test message body',
    show: true,
    onClose: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and text when show is true', () => {
    render(<LayoutToast {...props} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message body')).toBeInTheDocument();
  });

  it('does not render anything when show is false', () => {
    render(<LayoutToast {...props} show={false} />);
    expect(screen.queryByText('Test Title')).toBeNull();
    expect(screen.queryByText('Test message body')).toBeNull();
  });

  it('invokes onClose when close button is clicked', async () => {
    render(<LayoutToast {...props} />);
    const closeButton = screen.getByLabelText('Close');
    await userEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalled();
  });
});
