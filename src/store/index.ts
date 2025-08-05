import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import pokemonReducer from '@features/pokemon/pokemonSlice';
import { pokemonApi } from '@api/pokemonApi';
import compareReducer from '@features/compare/compareSlice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  compare: compareReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(pokemonApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  const state = store.getState();
  const selected = state.compare.selected;
  localStorage.setItem('compareSelected', JSON.stringify(selected));
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
