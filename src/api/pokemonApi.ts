import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface NamedAPIResource {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  results: NamedAPIResource[];
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    [key: string]: unknown;
  };
  types: { slot: number; type: NamedAPIResource }[];
  stats: { base_stat: number; stat: NamedAPIResource }[];
  abilities: { ability: NamedAPIResource; is_hidden: boolean }[];
}

export interface Ability {
  id: number;
  name: string;
  effect_entries: { effect: string; short_effect: string; language: NamedAPIResource }[];
}

// RTK Query-слайс
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon', 'Ability'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit: number; offset: number }>({
      query: ({ limit, offset }): string => `pokemon?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ name }) => ({ type: 'Pokemon' as const, id: name })),
              { type: 'Pokemon', id: 'LIST' },
            ]
          : [{ type: 'Pokemon', id: 'LIST' }],
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: (result, error, name) => [{ type: 'Pokemon', id: name }],
    }),
    getAbilityByName: builder.query<Ability, string>({
      query: (name) => `ability/${name}`,
      providesTags: (result, error, name) => [{ type: 'Ability', id: name }],
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useGetAbilityByNameQuery,
} = pokemonApi;
