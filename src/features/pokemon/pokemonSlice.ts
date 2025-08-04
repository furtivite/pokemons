import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface PokemonState {
  list: string[];
}

const initialState: PokemonState = {
  list: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList(state, action: PayloadAction<string[]>) {
      state.list = action.payload;
    },
    clearPokemonList(state) {
      state.list = [];
    },
  },
});

export const { setPokemonList, clearPokemonList } = pokemonSlice.actions;

export const selectPokemonList = (state: RootState) => state.pokemon.list;

export default pokemonSlice.reducer;