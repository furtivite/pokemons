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
    const heading = screen.getByRole('heading', { name: /stats/i, level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('h4')
  })

  it('renders a progress bar for each stat with correct value and label', () => {
    const progressbars = screen.getAllByRole('progressbar')
    expect(progressbars).toHaveLength(stats.length)

    stats.forEach(({ stat, base_stat }) => {
      const label = screen.getByText(`${base_stat}`)
      expect(label).toBeInTheDocument()

      const strong = screen.getByText(new RegExp(`${stat.name}:`, 'i'))
      expect(strong).toBeInTheDocument()
      expect(strong).toHaveClass('text-capitalize')

      const pb = screen.getByRole('progressbar', { name: `${base_stat}` })
      expect(pb).toHaveAttribute('aria-valuenow', base_stat.toString())
      expect(pb).toHaveAttribute('aria-valuemax', '255')
    })
  })
})