import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@components/Layout";
import { PokemonListPage } from "@pages/PokemonListPage";
import { PokemonDetailsPage } from "@pages/PokemonDetailsPage";
import { ComparePage } from "@pages/ComparePage";

const App: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<PokemonListPage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
      <Route path="/compare" element={<ComparePage />} />
    </Routes>
  </Layout>
);

export default App;