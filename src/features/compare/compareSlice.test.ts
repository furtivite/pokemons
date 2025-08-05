// src/features/compare/compareSlice.test.ts
import { configureStore } from '@reduxjs/toolkit'
import compareReducer, {
  toggleSelected,
  clearSelected,
  selectSelectedPokemons,
  MAX_COMPARE,
} from './compareSlice'

describe('compareSlice', () => {
  let store: ReturnType<typeof configureStore<{compare: ReturnType<typeof compareReducer>}>>

  beforeEach(() => {
    store = configureStore<{compare: ReturnType<typeof compareReducer>}>({
      reducer: {
        compare: compareReducer,
      },
    })
  })

  it('should start with empty selected array', () => {
    expect(store.getState().compare.selected).toEqual([])
  })

  it('toggleSelected should add an item when not present', () => {
    store.dispatch(toggleSelected('pikachu'))
    expect(store.getState().compare.selected).toEqual(['pikachu'])
  })

  it('toggleSelected should remove an existing item', () => {
    store.dispatch(toggleSelected('pikachu'))
    store.dispatch(toggleSelected('pikachu'))
    expect(store.getState().compare.selected).toEqual([])
  })

  it('clearSelected should empty the list', () => {
    store.dispatch(toggleSelected('a'))
    store.dispatch(toggleSelected('b'))
    expect(store.getState().compare.selected).toEqual(['a','b'])
    store.dispatch(clearSelected())
    expect(store.getState().compare.selected).toEqual([])
  })

  it('MAX_COMPARE constant should be > 0', () => {
    expect(typeof MAX_COMPARE).toBe('number')
    expect(MAX_COMPARE).toBeGreaterThan(0)
  })
})