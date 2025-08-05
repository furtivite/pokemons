import { render, screen } from '@testing-library/react';
import { PokemonHeader } from './PokemonHeader';

describe('PokemonHeader component', () => {
  const props = {
    name: 'charizard',
    spriteUrl: 'http://example.com/charizard.png',
    types: [
      { slot: 1, type: { name: 'fire' } },
      { slot: 2, type: { name: 'flying' } },
    ],
  };

  beforeEach(() => {
    render(<PokemonHeader {...props} />);
  });

  it('renders the sprite image with correct src, alt, classes, and loading attribute', () => {
    const img = screen.getByRole('img', { name: /charizard/i });
    expect(img).toHaveAttribute('src', props.spriteUrl);
    expect(img).toHaveAttribute('alt', props.name);
    expect(img).toHaveClass('img-fluid');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders the Pokémon name as a capitalized heading', () => {
    const heading = screen.getByRole('heading', { name: /charizard/i, level: 1 });
    expect(heading).toHaveClass('text-capitalize', 'mt-3', 'h2');
    expect(heading).toHaveTextContent('charizard');
  });

  it('renders a Badge for each type with correct text and classes', () => {
    const badges = screen.getAllByText(/fire|flying/i);
    expect(badges).toHaveLength(2);

    badges.forEach((badge, idx) => {
      expect(badge).toHaveTextContent(props.types[idx].type.name);
      expect(badge).toHaveClass('me-1', 'text-capitalize');
      expect(badge).toHaveClass('bg-primary');
    });
  });
});
