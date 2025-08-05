import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo component', () => {
  it('renders an image with correct src, dimensions, classes, and alt text', () => {
    render(<Logo />)
    const img = screen.getByRole('img', { name: /pokédex logo/i })
    expect(img).toHaveAttribute('src', '/logo.svg')
    expect(img).toHaveAttribute('width', '136')
    expect(img).toHaveAttribute('height', '50')
    expect(img).toHaveClass('d-inline-block', 'align-top')
  })
})