import { render, screen, fireEvent } from '@testing-library/react';
import { PageSizeSelector } from './PageSizeSelector';

describe('PageSizeSelector component', () => {
  const options = [10, 20, 50, 100];

  it('renders a select with the correct options and selected value', () => {
    render(<PageSizeSelector value={20} onChange={() => null} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    options.forEach((n) => {
    const option = select.querySelector(`option[value="${n}"]`) as HTMLOptionElement;
    expect(option).toBeInTheDocument();
    expect(option.selected).toBe(n === 20);
    });
  });

  it('calls onChange with the new numeric value when the selection changes', () => {
    const handleChange = jest.fn();
    render(<PageSizeSelector value={10} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '50' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(50);
  });
});