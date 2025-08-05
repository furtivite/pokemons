import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeContext, Theme } from '@theme/ThemeContext'
import { Header } from './Header'
import { useAppSelector, useAppDispatch } from '@store'
import { clearSelected } from '@features/compare/compareSlice'

jest.mock('@store', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}))

jest.mock('@features/compare/compareSlice', () => ({
  selectSelectedPokemons: jest.fn(),
  clearSelected: jest.fn(() => ({ type: 'compare/clearSelected' })),
}))

jest.mock('react-icons/fa', () => ({
  FaBars: () => <span data-testid="bars-icon" />,
  FaTimes: () => <span data-testid="times-icon" />,
  FaMoon: () => <span data-testid="moon-icon" />,
  FaSun: () => <span data-testid="sun-icon" />,
}))

describe('Header', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
    // default: no items selected
    ;(useAppSelector as jest.Mock).mockReturnValue([])
  })

  function renderHeader(path = '/') {
    return render(
      <ThemeContext.Provider
        value={{ theme: 'light' as Theme, toggleTheme: jest.fn() }}
      >
        <MemoryRouter initialEntries={[path]}>
          <Header />
        </MemoryRouter>
      </ThemeContext.Provider>
    )
  }

  it('does not show comparison link or clear button when none selected', () => {
    renderHeader('/')
    expect(screen.queryByText(/in Comparison/i)).toBeNull()
    expect(
      screen.queryByRole('button', { name: /Clear Comparison/i })
    ).toBeNull()
  })

  it('shows an active link to /compare with the selected count when on home', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue(['a', 'b', 'c'])
    renderHeader('/')
    const link = screen.getByRole('link', { name: /3 in Comparison/i })
    expect(link).toHaveAttribute('href', '/compare')
  })

  it('shows a disabled comparison link when already on /compare', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue(['x', 'y'])
    renderHeader('/compare')
    const disabled = screen.getByText(/2 in Comparison/i)
    expect(disabled).toHaveClass('disabled')
  })

  it('dispatches clearSelected when clicking Clear Comparison', () => {
    ;(useAppSelector as jest.Mock).mockReturnValue(['z'])
    renderHeader('/')
    const btn = screen.getByRole('button', { name: /Clear Comparison/i })
    fireEvent.click(btn)
    expect(mockDispatch).toHaveBeenCalledWith(clearSelected())
  })

  it('toggles burger icon between bars and cross on click', () => {
    renderHeader('/')
    // the first button is the navbar-toggler
    const [toggler] = screen.getAllByRole('button')
    // should show bars by default
    expect(screen.getByTestId('bars-icon')).toBeInTheDocument()
    fireEvent.click(toggler)
    expect(screen.getByTestId('times-icon')).toBeInTheDocument()
  })

  it('shows FaMoon icon in light mode and calls toggleTheme on click', () => {
    const toggleTheme = jest.fn()
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeContext.Provider>
    )
    const themeBtn = screen.getByRole('button', { name: /Toggle theme/i })
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    fireEvent.click(themeBtn)
    expect(toggleTheme).toHaveBeenCalled()
  })

  it('shows FaSun icon in dark mode', () => {
    const toggleTheme = jest.fn()
    render(
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeContext.Provider>
    )
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  })
})