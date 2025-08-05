import { ComponentProps } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonListPage } from './PokemonListPage';
import { useGetPokemonListQuery } from '@api/pokemonApi';
import { SearchBar } from '@components/SearchBar';
import { PageSizeSelector } from '@components/PageSizeSelector';
import { PaginationControl } from '@components/PaginationControl';
import { PokemonCard } from '@components/PokemonCard';

type SearchBarProps = ComponentProps<typeof SearchBar>;
type PageSizeSelectorProps = ComponentProps<typeof PageSizeSelector>;
type PaginationControlProps = ComponentProps<typeof PaginationControl>;
type PokemonCardProps = ComponentProps<typeof PokemonCard>;

jest.mock('@api/pokemonApi', () => ({
  useGetPokemonListQuery: jest.fn(),
}));

jest.mock('@components/SearchBar', () => ({
  SearchBar: ({ value, onChange }: SearchBarProps) => (
    <div data-testid="searchbar">
      <input placeholder="Search" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  ),
}));

jest.mock('@components/PageSizeSelector', () => ({
  PageSizeSelector: ({ value, onChange }: PageSizeSelectorProps) => (
    <div data-testid="pagesize">
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  ),
}));

jest.mock('@components/PaginationControl', () => ({
  PaginationControl: ({ totalPages, currentPage, onPageChange }: PaginationControlProps) => (
    <div data-testid="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  ),
}));

jest.mock('@components/PokemonCard', () => ({
  PokemonCard: ({ name }: PokemonCardProps) => <div data-testid="card">{name}</div>,
}));

jest.mock('@components/PokemonCardSkeleton', () => ({
  PokemonCardSkeleton: () => <div data-testid="skeleton" />,
}));

describe('PokemonListPage', () => {
  const results = Array.from({ length: 5 }, (_, i) => ({
    name: `p${i}`,
    url: `/p${i}`,
  }));

  it('shows skeletons while loading', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    render(<PokemonListPage />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(8);
  });

  it('shows error alert on error', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
    });
    render(<PokemonListPage />);
    expect(screen.getByText(/error loading pokémon list/i)).toBeInTheDocument();
  });

  it('renders controls and cards when data is ready, supports search and pagination', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: { count: 5, results },
      error: undefined,
      isLoading: false,
    });
    render(<PokemonListPage />);

    expect(screen.getByTestId('searchbar')).toBeInTheDocument();
    expect(screen.getByTestId('pagesize')).toBeInTheDocument();

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(5);
    expect(cards[0]).toHaveTextContent('p0');

    expect(screen.getByTestId('pagination')).toHaveTextContent('1/1');

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'p1' } });
    expect(screen.getAllByTestId('card')).toHaveLength(1);
    expect(screen.getByText('p1')).toBeInTheDocument();

    const pagesizeContainer = screen.getByTestId('pagesize');
    const selectElem = pagesizeContainer.querySelector('select');
    expect(selectElem).toBeInTheDocument();
    const select = selectElem as HTMLSelectElement;

    fireEvent.change(select, { target: { value: '10' } });
    expect(screen.getAllByTestId('card')).toHaveLength(1);

    const prev = screen.getByText('Prev');
    const next = screen.getByText('Next');
    expect(prev).toBeDisabled();
    expect(next).toBeDisabled();
  });
});
