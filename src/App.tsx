import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { LoadingSpinner } from '@components/LoadingSpinner';

const PokemonListPage = lazy(() => import(/* webpackChunkName: "pokemon-list-page" */ '@pages/PokemonListPage'));
const PokemonDetailsPage = lazy(() => import(/* webpackChunkName: "pokemon-details-page" */ '@pages/PokemonDetailsPage'));
const ComparePage = lazy(() => import(/* webpackChunkName: "pokemon-compare-page" */ '@pages/ComparePage'));

const App: React.FC = () => (
  <Layout>
    <Suspense fallback={<LoadingSpinner className="d-block mx-auto mt-5" />}>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Suspense>
  </Layout>
);

export default App;
