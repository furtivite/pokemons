import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface CompareState {
    selected: string[];
}

const initialState: CompareState = {
    selected: [],
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        toggleSelected(state, action: PayloadAction<string>) {
            const name = action.payload;
            const idx = state.selected.indexOf(name);
            if (idx >= 0) {
            state.selected.splice(idx, 1);
            } else {
            state.selected.push(name);
            }
        },
        clearSelected(state) {
            state.selected = [];
        },
    },
});

export const { toggleSelected, clearSelected } = compareSlice.actions;

export const selectSelectedPokemons = (state: RootState) =>
  state.compare.selected;

export default compareSlice.reducer;
