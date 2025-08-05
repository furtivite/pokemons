import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGetPokemonByNameQuery, useGetAbilityByNameQuery } from '@api/pokemonApi';
import { useAppDispatch, useAppSelector } from '@store';
import { toggleSelected } from '@features/compare/compareSlice';
import { PokemonCard } from './PokemonCard';

jest.mock('@api/pokemonApi', () => ({
  useGetPokemonByNameQuery: jest.fn(),
  useGetAbilityByNameQuery: jest.fn(),
}));

jest.mock('@store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('PokemonCard component', () => {
  const samplePokemon = {
    name: 'pikachu',
    sprites: { front_default: 'url' },
    types: [{ slot: 1, type: { name: 'electric' } }],
    stats: [],
    abilities: [{ ability: { name: 'static' }, is_hidden: false }],
  };

  beforeEach(() => {
    // mock Redux hooks
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue([]);

    // mock RTK Query hooks
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    (useGetAbilityByNameQuery as jest.Mock).mockReturnValue({
      data: { effect_entries: [{ language: { name: 'en' }, short_effect: 'effect' }] },
      isLoading: false,
      error: undefined,
    });
  });

  it('renders LoadingSpinner when loading', () => {
    render(
      <BrowserRouter>
        <PokemonCard name="pikachu" />
      </BrowserRouter>,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error Alert when error', () => {
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    });
    render(
      <BrowserRouter>
        <PokemonCard name="pikachu" />
      </BrowserRouter>,
    );
    expect(screen.getByText(/error loading pikachu/i)).toBeInTheDocument();
  });

  it('renders image, name link, types and abilities when data is ready', () => {
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: samplePokemon,
      isLoading: false,
      error: false,
    });
    render(
      <BrowserRouter>
        <PokemonCard name="pikachu" />
      </BrowserRouter>,
    );
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute('src', 'url');
    expect(screen.getByRole('link', { name: /pikachu/i })).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
    expect(screen.getByText(/static/i)).toBeInTheDocument();
  });

  it('navigates to details on Enter key', () => {
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: samplePokemon,
      isLoading: false,
      error: false,
    });
    render(
      <BrowserRouter>
        <PokemonCard name="pikachu" />
      </BrowserRouter>,
    );
    const card = screen.getByRole('group');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/pikachu');
  });

  it('toggles compare on Space key', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: samplePokemon,
      isLoading: false,
      error: false,
    });
    render(
      <BrowserRouter>
        <PokemonCard name="pikachu" />
      </BrowserRouter>,
    );
    const card = screen.getByRole('group');
    fireEvent.keyDown(card, { key: ' ' });
    expect(mockDispatch).toHaveBeenCalledWith(toggleSelected('pikachu'));
  });

  it('toggles compare when clicking the checkbox', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: samplePokemon,
      isLoading: false,
      error: false,
    });
    render(
      <BrowserRouter>
        <PokemonCard name="pikachu" />
      </BrowserRouter>,
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(toggleSelected('pikachu'));
  });
});
