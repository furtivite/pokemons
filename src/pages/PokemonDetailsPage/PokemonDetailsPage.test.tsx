import { render, screen, fireEvent } from '@testing-library/react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetPokemonByNameQuery,
  useGetAbilityByNameQuery,
} from '@api/pokemonApi'
import { useAppDispatch, useAppSelector } from '@store'
import {
  toggleSelected,
  MAX_COMPARE,
} from '@features/compare/compareSlice'
import { PokemonDetailsPage } from './PokemonDetailsPage'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}))
jest.mock('@api/pokemonApi', () => ({
  useGetPokemonByNameQuery: jest.fn(),
  useGetAbilityByNameQuery: jest.fn(),
}))
jest.mock('@store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}))
jest.mock('@features/compare/compareSlice', () => ({
  toggleSelected: jest.fn(name => ({ type: 'toggle', payload: name })),
  selectSelectedPokemons: jest.fn(),
  MAX_COMPARE: 4,
}))

describe('PokemonDetailsPage', () => {
  const mockDispatch = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
    ;(useAppSelector as jest.Mock).mockReturnValue([])
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    ;(useParams as jest.Mock).mockReturnValue({ name: 'charmander' })
    ;(useGetAbilityByNameQuery as jest.Mock).mockReturnValue({
      data: { effect_entries: [{ language: { name: 'en' }, short_effect: '' }] },
      isLoading: false,
      error: undefined,
    })
  })

  it('renders skeleton when loading', () => {
    ;(useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    })
    render(<PokemonDetailsPage />)
    expect(screen.getByTestId('pokemon-details-skeleton')).toBeInTheDocument()
  })

  it('renders error alert on fetch error', () => {
    ;(useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    })
    render(<PokemonDetailsPage />)
    expect(
      screen.getByText(/error loading pokémon details\./i)
    ).toBeInTheDocument()
  })

  it('renders not found alert when no pokemon', () => {
    ;(useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: false,
    })
    render(<PokemonDetailsPage />)
    expect(
      screen.getByText(/pokémon not found\./i)
    ).toBeInTheDocument()
  })

  it('renders details and compare toggle, and dispatches toggleSelected', () => {
    const fakePokemon = {
      name: 'charmander',
      sprites: { front_default: 'http://img' },
      types: [{ slot: 1, type: { name: 'fire', url: '' } }],
      stats: [{ stat: { name: 'hp', url: '' }, base_stat: 39 }],
      abilities: [{ ability: { name: 'blaze', url: '' }, is_hidden: false }],
    }
    ;(useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: fakePokemon,
      isLoading: false,
      error: false,
    })

    render(<PokemonDetailsPage />)

    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)

    const toggleInput = screen.getByRole('checkbox', {
      name: /add charmander to comparison/i,
    }) as HTMLInputElement
    expect(toggleInput).not.toBeChecked()
    expect(toggleInput).not.toBeDisabled()

    fireEvent.click(toggleInput)
    expect(mockDispatch).toHaveBeenCalledWith(toggleSelected('charmander'))

    fireEvent.keyDown(toggleInput, { key: ' ' })
    expect(mockDispatch).toHaveBeenCalledWith(toggleSelected('charmander'))
  })

  it('disables compare toggle when max reached', () => {
    ;(useGetPokemonByNameQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'charmander',
        sprites: { front_default: 'http://img' },
        types: [],
        stats: [],
        abilities: [],
      },
      isLoading: false,
      error: false,
    })
    ;(useAppSelector as jest.Mock).mockReturnValue(
      Array(MAX_COMPARE).fill('x')
    )

    render(<PokemonDetailsPage />)

    const toggleInput = screen.getByRole('checkbox', {
      name: /add charmander to comparison/i,
    })
    expect(toggleInput).toBeDisabled()
  })
})