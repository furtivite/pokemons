import { render, screen, fireEvent } from '@testing-library/react';
import { AbilityBadge } from './AbilityBadge';
import * as api from '@api/pokemonApi';

jest.mock('@api/pokemonApi');

describe('AbilityBadge component', () => {
  const mockUseGetAbility = api.useGetAbilityByNameQuery as jest.Mock;

  beforeEach(() => {
    mockUseGetAbility.mockReset();
  });

  it('shows loading text in tooltip when ability data is not yet available', async () => {
    mockUseGetAbility.mockReturnValue({ data: undefined });

    render(<AbilityBadge name="overgrow" />);
    const badge = screen.getByText(/overgrow/i);
    expect(badge).toBeInTheDocument();

    fireEvent.mouseOver(badge);
    const tooltip = await screen.findByText('Loading...');
    expect(tooltip).toBeInTheDocument();
  });

  it('renders effect text in tooltip when ability data is available', async () => {
    const effectEntries = [
      { short_effect: 'Test effect', language: { name: 'en', url: '' } },
      { short_effect: 'Otro efecto', language: { name: 'es', url: '' } },
    ];
    mockUseGetAbility.mockReturnValue({ data: { id: 1, name: 'overgrow', effect_entries: effectEntries } });

    render(<AbilityBadge name="overgrow" />);
    const badge = screen.getByText(/overgrow/i);

    fireEvent.focus(badge);
    const tooltip = await screen.findByText('Test effect');
    expect(tooltip).toBeInTheDocument();
  });
});
