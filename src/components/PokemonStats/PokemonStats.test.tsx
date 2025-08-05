import { render, screen } from '@testing-library/react'
import { PokemonStats } from './PokemonStats'

describe('PokemonStats component', () => {
  const stats = [
    { stat: { name: 'hp' }, base_stat: 45 },
    { stat: { name: 'attack' }, base_stat: 60 },
    { stat: { name: 'defense' }, base_stat: 50 },
  ]

  beforeEach(() => {
    render(<PokemonStats stats={stats} />)
  })

  it('renders a heading "Stats"', () => {
    expect(screen.getByRole('heading', { name: /stats/i })).toBeInTheDocument()
  })

  it('renders a progress bar for each stat with correct value and label', () => {
    stats.forEach(({ stat: { name }, base_stat }) => {
      const label = screen.getByText(new RegExp(`${name}:`, 'i'))
      expect(label).toHaveClass('text-capitalize')

      const allBars = screen.getAllByRole('progressbar')
      const bar = allBars.find(
        (el) => el.getAttribute('aria-valuenow') === base_stat.toString()
      )
      expect(bar).toBeDefined()
      expect(bar).toHaveAttribute('aria-valuenow', base_stat.toString())
      expect(bar).toHaveAttribute('aria-valuemax', '255')
    })
  })
})