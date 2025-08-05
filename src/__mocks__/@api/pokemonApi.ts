import type { Middleware } from 'redux';

const createDummyMiddleware = () => {
  const dummy: Middleware = (_api) => (next) => (action) => next(action);
  return dummy;
};

export const pokemonApi = {
  reducerPath: 'pokemonApi' as const,
  reducer: (state = {}) => state,
  middleware: createDummyMiddleware,
};

export const useGetPokemonListQuery = jest.fn();
export const useGetPokemonByNameQuery = jest.fn();
export const useGetAbilityByNameQuery = jest.fn();
