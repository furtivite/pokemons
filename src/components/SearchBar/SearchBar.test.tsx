import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar component', () => {
  it('renders an input with the correct placeholder and value', () => {
    render(<SearchBar value="pikachu" onChange={() => null} />);
    const input = screen.getByPlaceholderText(/search pokémon/i);
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('pikachu');
  });

  it('calls onChange with the new value when typing', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/search pokémon/i);

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('bulbasaur');
  });
});
