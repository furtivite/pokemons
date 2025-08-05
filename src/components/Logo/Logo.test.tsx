import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo component', () => {
  it('renders an img with correct attributes', () => {
    render(<Logo />);

    const img = screen.getByRole('img', { name: /pokédex logo/i });
    expect(img).toBeInTheDocument();

    const src = img.getAttribute('src') ?? '';
    expect(src).toBe('/logo.svg');

    expect(img).toHaveAttribute('width', '136');
    expect(img).toHaveAttribute('height', '50');
    expect(img).toHaveClass('d-inline-block', 'align-top');
  });
});