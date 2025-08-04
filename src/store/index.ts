import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { pokemonApi } from '../api/pokemonApi';
import pokemonReducer from '../features/pokemon/pokemonSlice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
