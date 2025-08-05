// src/components/Footer/Footer.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'
import { ThemeContext, Theme } from '@theme/ThemeContext'

describe('Footer component', () => {
  const year = new Date().getFullYear()

  function renderWithTheme(theme: Theme) {
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme: () => null }}>
        <Footer />
      </ThemeContext.Provider>
    )
  }

  it('renders copyright and educational notice in light mode', () => {
    renderWithTheme('light')
    const footer = document.querySelector('footer')
    expect(footer).toHaveClass(
      'bg-light',
      'text-center',
      'text-secondary',
      'py-3',
      'mt-auto'
    )

    // Match the combined © YEAR by text across split nodes
    const copyrightLine = screen.getByText(
      new RegExp(`©\\s*${year}\\s*by`, 'i'),
      { selector: 'p.mb-0' }
    )
    expect(copyrightLine).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /frtvt/i })
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/furtivite'
    )
    expect(link).not.toHaveClass(
      'text-decoration-none',
      'text-light'
    )

    expect(
      screen.getByText(/all trademarks belong to their respective owners/i)
    ).toBeInTheDocument()
  })

  it('renders dark-mode classes and link styling in dark mode', () => {
    renderWithTheme('dark')
    const footer = document.querySelector('footer')
    expect(footer).toHaveClass(
      'bg-dark',
      'text-center',
      'text-light',
      'py-3',
      'mt-auto'
    )

    const link = screen.getByRole('link', { name: /frtvt/i })
    expect(link).toHaveClass(
      'text-decoration-none',
      'text-light'
    )
  })
})