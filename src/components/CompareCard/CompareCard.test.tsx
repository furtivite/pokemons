import { render, screen, fireEvent } from '@testing-library/react';
import { useGetPokemonByNameQuery, useGetAbilityByNameQuery } from '@api/pokemonApi';
import { useAppDispatch } from '@store';
import { CompareCard } from '@components/CompareCard';
import { toggleSelected } from '@features/compare/compareSlice';

jest.mock('@api/pokemonApi', () => ({
  useGetPokemonByNameQuery: jest.fn(),
  useGetAbilityByNameQuery: jest.fn(),
}));

jest.mock('@store', () => ({
  useAppDispatch: jest.fn(),
}));

describe('CompareCard component', () => {
  const samplePokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'bulba.png' },
    types: [{ slot: 1, type: { name: 'grass', url: '' } }],
    stats: [{ base_stat: 45, stat: { name: 'hp', url: '' } }],
    abilities: [{ ability: { name: 'overgrow', url: '' }, is_hidden: false }],
  };

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    (useGetAbilityByNameQuery as jest.Mock).mockReturnValue({
      data: { effect_entries: [] },
      isLoading: false,
      error: undefined,
    });
  });

  it('renders LoadingSpinner when loading', () => {
    render(<CompareCard name="bulbasaur" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error Alert when error', () => {
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    });
    render(<CompareCard name="bulbasaur" />);
    expect(screen.getByText(/error loading bulbasaur/i)).toBeInTheDocument();
  });

  it('renders image, types and stats when data is ready', () => {
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: samplePokemon,
      isLoading: false,
      error: false,
    });
    render(<CompareCard name="bulbasaur" />);
    expect(screen.getByRole('img', { name: /bulbasaur/i })).toHaveAttribute('src', 'bulba.png');
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/hp:/i)).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('dispatches toggleSelected when Remove button is clicked', () => {
    const dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: samplePokemon,
      isLoading: false,
      error: false,
    });
    render(<CompareCard name="bulbasaur" />);
    fireEvent.click(screen.getByLabelText(/remove bulbasaur from comparison/i));
    expect(dispatchMock).toHaveBeenCalledWith(toggleSelected('bulbasaur'));
  });
});
