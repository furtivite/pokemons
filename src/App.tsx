import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@components/Layout";

const App: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<>List</>} />
      <Route path="/pokemon/:name" element={<>Details</>} />
      <Route path="/compare" element={<>Compare</>} />
    </Routes>
  </Layout>
);

export default App;