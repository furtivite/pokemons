import { render, screen, fireEvent } from '@testing-library/react';
import { PaginationControl } from './PaginationControl';

describe('PaginationControl component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('renders all pages up to 7 without ellipsis', () => {
    render(
      <PaginationControl
        totalPages={5}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
    expect(screen.queryByText('…')).toBeNull();
  });

  it('renders ellipses and edge pages when totalPages > 7', () => {
    render(
      <PaginationControl
        totalPages={20}
        currentPage={10}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getAllByText('…').length).toBe(2);
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('calls onPageChange when a page number is clicked', () => {
    render(
      <PaginationControl
        totalPages={5}
        currentPage={2}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText('4'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange with out-of-range values when clicking Prev on first page or Next on last page', () => {
    const { unmount } = render(
      <PaginationControl totalPages={3} currentPage={1} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByText('‹'));
    expect(onPageChange).toHaveBeenCalledWith(0);

    unmount();
    onPageChange.mockClear();

    render(<PaginationControl totalPages={3} currentPage={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('›'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when Prev or Next is clicked on middle pages', () => {
    render(
      <PaginationControl
        totalPages={5}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText('‹'));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('›'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});