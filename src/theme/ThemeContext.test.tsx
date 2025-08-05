import { render, screen, fireEvent, act } from '@testing-library/react'
import { ThemeProvider, ThemeContext } from './ThemeContext'

describe('ThemeContext & ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-bs-theme')
  })

  it('provides default light theme and writes data-bs-theme on mount', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <div>Current: {theme}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )
    expect(screen.getByText(/Current: light/i)).toBeInTheDocument()
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('hydrates from localStorage if a valid theme is stored', () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <div>Current: {theme}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )
    expect(screen.getByText(/Current: dark/i)).toBeInTheDocument()
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')
  })

  it('toggleTheme flips between light and dark and persists', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <>
              <div>Current: {theme}</div>
              <button onClick={toggleTheme}>Switch</button>
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )

    const btn = screen.getByRole('button', { name: /Switch/i })

    act(() => {
      fireEvent.click(btn)
    })
    expect(screen.getByText(/Current: dark/i)).toBeInTheDocument()
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    act(() => {
      fireEvent.click(btn)
    })
    expect(screen.getByText(/Current: light/i)).toBeInTheDocument()
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})