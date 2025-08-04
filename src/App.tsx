import React from "react";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<>List</>} />
    <Route path="/pokemon/:name" element={<>Details</>} />
    <Route path="/compare" element={<>Compare</>} />
  </Routes>
);

export default App;