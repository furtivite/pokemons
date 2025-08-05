import { render, screen, fireEvent } from '@testing-library/react'
import { BackButton } from './BackButton'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('BackButton component', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders a button with label "Back"', () => {
    render(<BackButton />)
    const btn = screen.getByRole('button', { name: /back/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Back')
  })

  it('calls navigate(-1) when clicked', () => {
    render(<BackButton />)
    const btn = screen.getByRole('button', { name: /back/i })
    fireEvent.click(btn)
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})