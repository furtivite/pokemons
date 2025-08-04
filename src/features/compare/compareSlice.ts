import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const MAX_COMPARE = 4;

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
            } else if (state.selected.length < MAX_COMPARE) {
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
