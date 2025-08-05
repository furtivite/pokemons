import { render, screen } from '@testing-library/react';
import { PokemonAbilities } from './PokemonAbilities';

jest.mock('@components/AbilityBadge', () => ({
  AbilityBadge: ({ name }: { name: string }) => <span>{name}</span>,
}));

describe('PokemonAbilities component', () => {
  const abilities = [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }];

  beforeEach(() => {
    render(<PokemonAbilities abilities={abilities} />);
  });

  it('renders a heading "Abilities"', () => {
    const heading = screen.getByRole('heading', { name: /abilities/i, level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('mt-4', 'h4');
  });

  it('renders an AbilityBadge for each ability name', () => {
    abilities.forEach(({ ability }) => {
      const badge = screen.getByText(ability.name);
      expect(badge).toBeInTheDocument();
    });
  });
});
