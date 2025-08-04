import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@components/Layout";
import { PokemonListPage } from "@pages/PokemonListPage";
import { PokemonDetailsPage } from "@pages/PokemonDetailsPage";

const App: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<PokemonListPage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
      <Route path="/compare" element={<>Compare</>} />
    </Routes>
  </Layout>
);

export default App;